# Programando un servidor con Node.js y Express

NodeJs es un entorno de ejecucion basado en JavaScript y en el motor V8 de Chrome

```javascript
console.log('Hello World')
```

El codigo de un archivo `.js` puede ser ejecutado desde la terminal utilizando el siguiente comando

```bash
node file_name.js
```

Un nuevo proyecto de NodeJs puede ser inicializado mediante el siguiente comando.

```bash
npm init
```

Este comando crea un archivo `package.json` en la raiz del proyecto con informacion relevante del mismo proyecto.

```json
{
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

El modelo de control de versiones utilizado en npm se denomina control de versiones semantico (`MAJOR.MINOR.PATCH`).

> El signo `^` al frente de `^4.18.2` indica que cuando se actualizan las dependencias de un proyecto, la version de Express que se instalara sera al menos la 4.18.2, sin embargo la version instalada de Express tambien puede ser una que tenga un numero de `PATCH` mas grande (el ultimo numero) o un numero `MINOR` (el numero del medio) mas grande. La version principal de la libreria indicada por el primer numero `MAJOR` debe mantenerse.

Las dependencias de un proyecto pueden ser actualizadas con el siguiente comando.

```bash
npm update
```

Para instalar todas las dependencias actualizadas definidas en el package.json, se utiliza el siguiente comando.

```bash
npm install
```

> Tanto `npm install` como `npm update` deben ejecutarse desde la raiz del proyecto.

## Web server

Importacion del modulo de servidor web integrado en NodeJs

```javascript
const http = require('http')

const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World')
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```

1. El metodo `createServer()` del modulo `http` permite crear un nuevo servidor web.
2. La petición realizada se responde con el codigo de estado `200`.
3. El valor `text/plain` en la cabecera `Content-Type` le informa al receptor que los datos enviados estan en formato de texto plano.
4. Se adjunta el puerto de ejecucion del servidor con la variable a la cual se asigno el servidor (`app`), para asi escuchar las peticiones HTTP realizadas

> El servidor configurado se ejecuta en puerto 3000 del localhost

## Express

Express.js es una libreria de Node.js utilizada para abstraer los casos de uso generales que se requieren al construir un servidor backend

```javascript
const express = require('express')

const app = express()

const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'CSS is hard',
        important: false
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/notes', (req, res) => {
    res.json(notes)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```

1. La aplicacion de Express es almacenada a una variable llamada `app`.
2. El acceso a las rutas se realiza encadenando la variable que almacena la aplicacion con el metodo de estado que corresponda a la ruta especifica.
3. La funcion del controlador de eventos de la ruta controla las peticiones realizadas a dicha ruta.
4. Express establece de forma automatica el valor del encabezado `Content-Type` dependiendo del tipo de dato retornado, ademas de retornar el codigo de estado 200 por defecto a las peticiones realizadas.
5. La funcion del controlador de eventos acepta 2 parametros.
    - __req (request)__: Contiene toda la informacion de la solicitud HTTP realizada al servidor.
    - __res (response)__: Se utiliza para definir como se responde a la solicitud.

## REST

```javascript
const express = require('express')

const app = express()

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'CSS is hard',
        important: false
    },
    {
        id: 3,
        content: 'JavaScript is weird',
        important: true
    }
]
```

`Representational State Transfer`, tambien conocido como `REST` es un estilo arquitectonico destinado a la creacion de aplicaciones web escalables.

Las entidades singulares como las notas en el objeto `notes` se denominan recursos en el pensamiento REST.

Cada recurso tiene una URL asociada, la cual corresponde a la direccion unica del recurso.

Una convencion es crear la direccion unica para los recursos combinando el nombre del tipo de recurso (`notes`) con el identificador unico del recurso (`id`).

|Ruta | Metodo | Descripcion |
|-----|--------|-------------|
|notes/10|GET|Se obtiene el recurso identificado|
|notes|GET|Se obtienen todos los recuros de la coleccion|
|notes|POST|Se crea un nuevo recurso basado en los datos de la solicitud|
|notes/10|DELETE|Se elimina el recurso identificado|
|notes/10|PUT|Se reemplaza todo el recurso identificado con los datos de la solicitud|
|notes/10|PATCH|Se reemplaza una parte del recurso identificado con los datos de la solicitud|

```javascript
app.get('/', (req, res) => {
    res.send('<h1>Node.js and Express</h1>')
})

app.get('/notes', (req, res) => {
    res.json(notes)
})
```

Los parametros para las rutas en Express son definidos utilizando la sintaxis de 2 puntos `/:param`.

```javascript
app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})
```

En el ejemplo anterior, el parametro `id` de la ruta es accedido mediante el objeto `request` de la peticion.

La eliminacion de recursos en el servidor ocurre al realizar una solicitud `HTTP DELETE` a la URL, la cual recibe como parametro el `id` del recurso a eliminar.

```javascript
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end() // 204 NO CONTENT
})
```

La adicion de un nuevo recurso al servidor ocurre al realizar una solicitud `HTTP POST`.

La informacion del nuevo recurso se envia en el body de la solicitud en formato JSON.

Para acceder a los datos del body de la peticion se utiliza el `json-parser` de Express.

```javascript
app.use(express.json())
```

El json-parser toma los datos JSON de la peticion, los transforma en un objeto de JavaScript y luego los adjunta a la propiedad `body` del objeto `request` antes de llamar al controlador de la ruta.

```javascript
app.post('/notes', (req, res) => {
    const resource_id = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
    const body = req.body

    if (!body.content) return res.status(400).json({ error: 'Content is missing' })

    const note = {
        important: Boolean(body.important) || false,
        content: body.content
    }

    note.id = resource_id + 1

    notes = notes.concat(note)
    res.status(201).end() // 201 CREATED
})
```

## Peticiones HTTP

### SEGURIDAD

En las solicitudes `HTTP` la seguridad hace referencia a que la peticion en ejecucion no debe causar ningun efecto secundario en el servidor.

El estandar `HTTP` define el tipo de solicitud `HEAD`, el cual funciona igual que el metodo `GET` pero unicamente devuelve el codigo de estado y las cabeceras de respuesta.

### IDEMPOTENCIA

Todas las solicitudes `HTTP` excepto `POST` deben ser idempotentes.

Si una solicitud tiene efectos secundarios, el resultado deberia ser el mismo independientemente de cuantas veces se envie la solicitud.
- Si se hace una peticion `HTTP PUT` a la url `/api/notes/10` y con la solicitud se envian los datos `{content: 'no side effects', important: 'true'}` el resultado es el mismo independientemente de cuantas veces se envie la solicitud.

## Middleware

Los middleware son funciones que se pueden utilizar para manejar objetos `request` y `response`.

Las funciones de middleware se ejecutan entre la peticion y la respuesta realizada.

El middleware `json-parser` toma los datos sin procesar de las solicitudes que estan almacenadas en el objeto request, los parsea en un objeto de JavaScript y lo asigna en el request como una nueva propiedad `body`.

Cuando se tiene mas de un middleware, se ejecutan uno por uno en el orden en el que se definieron en el codigo de la aplicacion.


Un middleware es una funcion que recibe 3 parametros.
- request
- response
- next


Al final del cuerpo de la funcion se llama a la funcion `next()` que se paso como tercer parametro. Esta funcion `next()` cede el control al siguiente middleware en la cadena.

```javascript
const requestLogger = (req, res, next) => {
    console.log('Method ', req.method)
    console.log('Path ', req.path)
    console.log('Body ', req.body)
    console.log('---')
    next()
}
```

El middleware se utiliza de la siguiente forma:
- `app.use(requestLogger)` es la funcion middlewre que se ejecutara para todas las rutas a las que se acceda.
- Las funciones middleware deben definirse antes que las rutas cuando se quiere que estos sean ejecutados por los controladores de eventos de las mismas

```javascript
// Antes de ejecutarse el controlador de eventos de la ruta, se ejecuta la funcion middleware requestLogger
app.get('/', (req, res) => {
    res.json({ content: 'Node.js' })
})
```

Cuando ningun controlador de rutas se encargue de la solicitud HTTP, las funciones middleware pueden ser definidas despues de las rutas.

```javascript
const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
```

El middleware se usa para capturar solicitudes realizadas a rutas inexistentes.

```javascript
app.use(unknownEndpoint)
```

# Despliegue a Internet

Es posible permitir solicitudes de otros origenes utilizando el middleware `cors` de Node

```javascript
const express = require('express')

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ content: 'Node.js' })
})

app.get('/api/notes', (req, res) => {
    res.json([{
        "id": "dce6",
        "content": "HTML is kwai",
        "important": false
    }])
})

app.listen(3001)
```

## Politica de mismo origen y CORS

`same origin policy` (politica de mismo origen). El origen de una URL es definido por la combinacion de protocolo (tambien conocido como esquema), nombre de host y puerto.

> http://example.com:80/index.html

- protocol: http
- host: example.com
- port: 80

1. Cuando se visita un sitio web, el navegador emite una solicitud al servidor en el que esta alojado el sitio web.
2. La respuestas enviada por el servidor es un archivo HTML que puede contener una o mas referencias a recursos externos alojados ya sea en el mismo servidor o en uno distinto.
3. Cuando el navegador ve referencias a una URL en el HTML fuente, emite una solicitud a dicha URL, si la solicitud se realiza utilizando la URL desde la cual se obtuvo el HTML fuente, entonces el navegador procesa la solicitud sin problemas.
4. Si el recurso se obtiene utilizando una URL que no comparte el mismo origen `(esquema, origen, puerto)` que el HTML fuente, el navegador tendra que verificar el encabezado de respuesta `Access-Control-Allow-Origin`, si este contiene `*` en la URL del HTML fuente, el navegador procesara la respuesta; de lo contrario el navegador se negara a procesarla y generara un error.

Para habilitar solicitudes cruzadas legitimas (solicitudes a URLs que no comparten el mismo origen), W3C ideo un mecanismo llamado CORS (Cross-Origin Resource Sharing).

## Frontend production build

Las aplicaciones de React en el modo desarrollo estan configuradas para dar mensajes de error claros, mostrar inmediatamente los cambios en el navegador, etc.

Al desplegar la aplicacion, se debe crear un `production build` (compilacion de produccion) o una version de la aplicacion que este optimizada para produccion.

Una compilacion de produccion para aplicaciones nativas de `Vite` puede crearse con el siguiente comando

```sh
npm run build
```

Este comando crea un directorio llamado `dist`, el cual contiene el unico archivo HTML de la aplicacion y el directorio `assets`.

Se genera una version minificada del codigo JavaScript de la aplicacion en el directorio `dist`. Aunque el codigo de la aplicacion este separado en varios archivos, el JavaScript se reducira a un solo archivo, incluyendo tambien sus dependencias.

## Archivos estaticos desde el backend

Para que Express muestre contenido estatico, por ejemplo una pagina index.html, archivos javascript, etc, se utiliza el middleware integrado de Express llamado static.

```javascript
app.use(express.static('dist'))
```

Siempre que Express reciba peticiones GET, primero verificara si el directorio `dist` contiene un archivo correspondiente a la direccion de la solicitud, en caso de encontrarlo Express lo devolvera.

Las peticiones realizadas a la direccion `localhost:3001` mostraran el Frontend de React, mientras que las solicitudes GET realizadas a la direccion localhost:3001/api/notes seran manejadas por el backend.

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

let notes = [
    {
        "id": 1,
        "content": "HTML is kwai",
        "important": false
    },
    {
        "id": 2,
        "content": "JS is easy",
        "important": false
    },
    {
        "id": 3,
        "content": "CSS is for styles",
        "important": true
    },
    {
        "id": 4,
        "content": "React is not a framework",
        "important": false
    }
]

app.use(express.static('dist'))

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    singleNote = notes.find(note => note.id === Number(req.params.id))
    res.json(singleNote)
})
```

## Sirviendo archivos estaticos desde el Backend

Una opcion para implementar el backend es copiar la compilacion de produccion (el directorio dist) a la raiz del repositorio del backend y configurar el backend para que muestre la pagina principal del Frontend (el archivo index.html) como su pagina principal.

La compilacion de produccion del frontend se copiaria en la raiz del backend.

```sh
cp -r dist ./backend
```

Cada vez que se realice un cambio en el Frontend, se debe crear una nueva compilacion de produccion y copiarse en la raiz del repositorio del backend.

Cuando se usa un navegador para ir a la direccion `/`, el servidor devuelve el archivo `index.html` del directorio `dist`.

> El archivo `index.html` contiene instrucciones para obtener las hojas de estilo CSS y el codigo JavaScript compilados para produccion.

## Optimizando el despliegue del Frontend

Para crear una nueva compilacion de produccion del frontend sin trabajo manual adicional, se pueden agregar scripts npm al `package.json` del repositorio de backend.

```json
{
    "scripts": {
        // ...
        "build:ui": "rm -rf dist && cd ../frontend/ && npm run build && cp -r dist ../backend"
    }
}
```

En Windows los comandos de shell estandar en `build:ui` no funcionan de forma nativa. En powershell se puede escribir el script como

```sh
"build:ui": "@powershell Remove-Item" -Recurse -Force dist && cd ../frontend && npm run build && @powershell Copy-Item dist -Recurse dist ../backend
```

El script `npm run build:ui` construye el Frontent y copia la version de produccion en la raiz del del backend.

## Proxy

Al compilar una aplicacion del Frontend, generalmente se modifica la direccion que apunta al Backend por una ruta relativa ya que tanto el backend como el frontend se ejecutaran en la misma direccion

```javascript
const baseUrl = '/api/notes'
```

Debido a que en el modo de desarrollo el Frontend esta en una direccion distinta a la del Backend, las solicitudes a este ultimo irian a la direccion incorrecta

> localhost:5173/api/notes

Los proyectos creados con Vite permiten solucionar este problema de forma simple, agregando la siguiente declaracion al archivo vite.config.js del repositorio del Frontend

    export default defineConfig({
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3001',
                    changeOrigin: true
                }
            }
        }
    })

- Un proxy configura las reglas personalizadas para el servidor de desarrollo.
- Espera un objeto de pares `{key: options}`.
- Cualquier solicitud cuya ruta comience con esa `key` se enviara a ese destino especificado.

# MongoDB

## Bases de datos y colecciones

MongoDB almacena datos a traves de documentos (documentos BSON), los cuales son agrupados en colecciones. Una base de datos almacena una o mas colecciones de documentos.

### Colecciones

Las colecciones se pueden asociar a lo que son las tablas en las bases de datos relacionales.

### Documentos

BSON es una representacion binaria de un documento JSON.

    {
        field1: value1,
        field2: value2,
        ...
        fieldN: valueN
    }

El valor de un campo puede ser cualquier tipo de dato BSON, soportado, incluidos otros documentos.

    var mydoc = {
        _id: ObjectId("5098922343424f391"),
        name: {first: "Alan", last: "Turing"},
        contribs: ["Turing Machine", "Turing Test"],
        views: NumberLong(12500000)
    }

#### Campos

- El nombre de campo _id esta reservado para la llave primaria del documento.
- El servidor permite nombres de campos que contengan el caracter ($) y (.).
- Los nombres de los campos no pueden contener el valor null.

## Mongoose

Mongoose se puede describir como un mapeador de objetos a documentos (ODM).

```javascript
const mongoose = require('mongoose')
```

- La contraseña utilizada es es añadida a la cadena de conexion `<username>:<password>`.
- El nombre de la base de datos personalizada se añade la URI antes de la cadena `?retryWrites`.

```javascript
const url = `mongodb+srv://martindotdev:${password}@fullstackopencluster.asrmplj.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=FullStackOpenCluster`
```

Configuracion relacionada con la forma en que mongoose maneja las consultas que contienen campos no definidos en el esquema del modelo

```javascript
mongoose.set('strictQuery', false)
```

Definicion de la conexion a la base de datos proporcionaando la URI de la base de datos

```javascript
mongoose.connect(url)
```

El esquema le indica a mongoose como se almacenaran los objetos en la base de datos

```javascript
const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean
})
```

En la definicion de un modelo, el primer parametro `Note` es el nombre singular del modelo.

Por convencion de mongoose se nombran las colecciones de forma automatica como el plural, eg (notes), cuando el esquema se refiere a ellas en singular.

```sh
-| notesApp -> Base de datos
    -| notes -> Coleccion
        ...
```

```javascript
const Note = mongoose.model('Note', noteSchema)
```

La idea de mongoose es que los datos almacenados en la base de datos reciban un esquema al nivel de la aplicacion que definan la forma de los documentos son almacenados en una coleccion determinada.

Los modelos son funciones contructoras que crean nuevos objetos JavaScript basados en los parametros proporcionados.

Dado que los objetos se crean con la funcion constructora del modelo, estos tienen acceso a todas sus propiedades, ademas de los metodos para guardar el objeto en la base de datos.

```javascript
const note = new Note({
    content: 'HTML is easy',
    important: true
})
```

Los objetos se guardan en la base de datos a traves del metodo `save()`.

```javascript
note.save().then((result) => {
    console.log('note saved!')

    // Si la conexion con la base de datos no es cerrada el programa nunca termina su ejecucion
    mongoose.connection.close()
})
```

Cuando el objeto se guarda en la base de datos, el controlador de eventos `then()` se invoca y posteriormente se cierra la conexion de la base de datos.

El metodo `find()` permite obtener objetos de la base de datos.

```javascript
Note.find({})
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
```

El parametro del metodo `find()` es un objeto que expresa condiciones de busqueda. Al ser un objeto vacio `{}`, se obtienen todos los objetos de la coleccion `notes`.

## toJson

Los objetos devueltos por mongoose pueden ser modificados mediante el metodo `toJson` del esquema utilizado por todas las instancias de los modelos producidos por ese esquema.

En el siguiente ejemplo se añade una nueva propiedad llamada `id` al objeto retornado, a partir de la propiedad `_id` la cual es formateada a tipo string. Se eliminan ademas las propiedades `_id` y `__v` retornadas por el objeto.

```javascript
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v
    }
})
```

## Manejo de errores

El bloque `catch` se implementa para manejar los casos en los que la promesa devuelta por ejemplo por el metodo `findById()` es rechazada.

Uno de los motivos de rechazo de la promesa puede darse cuando se pasa como parametro un tipo de id incorrecto.

```javascript
const express = require('express')
const app = express()

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log('Error:', error.message)
            res.status(400).json({ error: 'malformatted id' })
        })
})
```

## Middleware error

El manejo de errores puede implementarse en un bloque de codigo separado a traves de un middleware.

- El error puede ser pasado o no a la funcion `next()`.
- Si no se pasa el parametro error a la funcion `next()`, la ejecucion pasaria a la siguiente ruta o middleware en la cadena.
- Si se invoca la funcion `next()` con el parametro error, la ejecucion continua en el middleware del controlador de errores.
- Los controladores de errores de Express son middleware que se definen con una funcion que acepta 4 parametros.

```javascript
const errorHandler = (error, req, res, next) => {}
```

- Este debe ser el ultimo middleware cargado. Todas las rutas deben ser registradas antes que la definicion del controlador de errores.

```javascript
app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log('Error:', error.message)
            next(error)
        })
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        res.status(400).json({ error: 'malformatted id' })
    }
}

app.use(errorHandler)
```

## Orden de carga del middleware

El orden de ejecucion de las funciones middleware es el mismo que el orden en que se cargan en Express con la funcion `app.use()`

```javascript
app.use(express.static('build'))
app.use(express.json())
app.use(logger)

...

app.use(unknownEndpoint)
app.use(errorHandler)
```

- El middleware `json-parser` debe estar entre los primeros middleware cargados en Express para que asi los datos JSON enviados con las solicitudes HTTP esten disponibles para todos los controladores de ruta que los requieran.
- El middleware para manejar las rutas no admitidas debe estar junto al ultimo middleware que se cargo en Express, justo antes del controlador de errores.

## Mongoose

mongoose dispone de una forma de validacion en el formato de los datos, antes de que estos se almacenen en la base de datos.

Es posible definir reglas de validacion especificas para cada campo en el esquema.

```javascript
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)
```

> En el esquema anterior se definio que el campo content debe tener al menos cinco caracteres de longitud, debe ser requerido y debe ser de tipo String.

La accion `update` omite por defecto las validaciones definidas en el esquema.

Para admitir las validaciones es necesario añadir un objeto `{runValidators: true}` como tercer argumento.

```javascript
app.put('/api/notes/:id', (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        .then(response => {
            res.json(response)
        })
})
```

## Lint

Un lint o linter es una herramienta que detecta y marca errores en un lenguaje de programacion, incluidos los errores de estilo. Las herramientas de tipo lint generalmente realizan analisis estaticos del codigo fuente.

### ESlint

Instalacion

```sh
npm i eslint -D
```

Inicializar una configuracion predeterminada de ESlint

```sh
npx eslint --lint
```

La configuracion se guardara en el archivo `.eslintrc.js`.

```json
module.exports = {
    // ...
    "plugins": [
        "@stylistic/js"
    ],
    "extends": "eslint:recommended",
    "rules": {
        "@stylistic/js/indent": [
            "error",
            2
        ],
        "@stylistic/js/linebreak-style": [
            "error",
            "unix"
        ],
        "@stylistic/js/quotes": [
            "error",
            "single"
        ],
        "@stylistic/js/semi": [
            "error",
            "never"
        ],
    }
}
```

Extends `eslint:recommend` añade un conjunto de reglas recomendadas al proyecto.

En el ejemplo anterior se han añadido reglas para la identacion, saltos de linea, guiones y puntos y comas. Estas 4 reglas de estilo estan definidas en el plugin de estilos de ESlint `(@stylistic/js)`.

La inspeccion con eslint de un archivo se puede hacer mediante el siguiente comando:

```sh
npx eslint index.js
```

Es recomendable crear un script npm en el `package.json` para realizar el proceso de linting con eslint

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

Ahora el comando `npm run lint` comprueba todos los archivos del proyecto.

En la raiz del proyecto se puede crear un archivo `.eslintignore` para evitar comprobar ciertos archivos y directorios, como por ejemplo el contenido de `dist`.

ESlint permite añadir reglas adicionales, por ejemplo, evitar espacios adicionales al final de las lineas, que siempre haya un espacio antes y despues de las llaves, que haya un uso consistente de espacios en blanco en los parametros de funcion, en las funciones de flecha.

```json
{
    ...
    "rules": {
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", {"before": true, "after": true}
        ]
    }
}
```

La configuracion predeterminada de ESlint incluye un monton de reglas por defecto de `eslint:recommend`. La desactivacion de una regla se puede lograr definiendo su valor en 0 en el archivo de configuracion.

```json
{
    ...
    "rules": {
        "no-console": 0
    }
}
```