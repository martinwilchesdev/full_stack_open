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