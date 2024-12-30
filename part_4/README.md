# Estructura de la aplicación backend, introducción a las pruebas

## Estructura del proyecto

```sh
|- index.js
|- app.js
|- dist
    |- ...
|- controllers
    |- notes.js
|- models
    |- note.js
|- package.json
|- packagelock.json
|- utils
    |- config.js
    |- logger.js
    |- middleware.js
```

## Router

El enrutador `Router()` es un middleware que se puede utilizar para definir rutas relacionadas en un solo lugar, normalmente colocadas en su propio modulo

```js
const notesRouter = require('express').Router()
```

Todas las rutas se definen para el objeto enrutador en lugar de la aplicacion completa, eg, `app.get()`

```js
notesRouter.get()
```

El enrutador de express se exporta para que este disponible para todos los consumidores del modulo

```js
module.exports = notesRouter
```

El archivo que crea la aplicacion real importa el enrutador.

Las rutas definidas en el enrutador se agregan a la URL base `/api/notes`.

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```

El enrutador definido se usa si la URL de la solicitud comienza con `/api/notes`.

Por esta razon, el objeto `notesRouter` solo debe definir las partes relativas de las rutas, es decir la ruta raiz `/` o una ruta que admita un parametro `/:id`.

```js
notesRouter.post('/:id', () => {
    res.json({message: 'Test'})
})
```

La peticion POST realizada a la URL `http://localhost:3001/api/notes/1` se capturara por la ruta del controlador anteriormente definida

## Testing de aplicaciones de Node

Node dispone de una libreria de pruebas integrada llamada `node:test`.

En el `package.json` se define el script que permitira la ejecucion de los tests.

```json
{
    "scripts": {
        "test": "node --test"
    }
}
```

La ejecucion de las pruebas se realiza mediante el siguiente comando.

```javascript
npm test
```

La libreria `node:test` espera que los archivos ubicados en el directorio `/test` contengan la palabra test en el nombre del mismo, por ejemplo `api.test.js`.

```javascript
const { test } = require('node:test') // Importacion de la libreria node:test
const assert = require('node:assert') // Importacion de la libreria node:assert
```

La prueba se define con la palabra clave `test`, la libreria assert se utiliza para verificar los resultados de las funciones bajo prueba.

El primer argumento de la funcion `test` es la descripcion de la prueba como una cadena de texto, la cual se mostrara por consola cuando la prueba sea ejecutada. El segundo argumento es una funcion que define la funcionalidad de la prueba a realizar.

```javascript
const reverse = require('../utils/for_testing').reverse

test('reverse of martin', () => {
    const result = reverse('martin') // La funcion reverse() retorna el string pasado como parametro con sus caracteres invertidos de izquierda a derecha

    assert.strictEqual(result, 'nitram')
})
```

Mediante la libreria `assert` se verifica el resultado de la prueba.

El metodo `assert.strictEqual()` valida que el resultado (primer parametro) obtenido sea exactamente igual al resultado esperado (segundo parametro).

## describe

```javascript
const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

// Se pueden usar bloques de descripcion (describe) para agrupar pruebas en colecciones logicas
describe('average', () => {
    test('of only one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(average([1,2,3,4,5,6]), 3.5)
    })

    test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
    })
})
```

## assert

assert.equal(1, '1'), Valida la igualdad de 2 valores omitiendo los tipos.

assert.strictEqual(1, '1'), Valida la igualdad de 2 valores incluido el tipo de estos.

assert.deepEqual({a: '1'}, {a: 1}), Similar a `.equal`. Se utiliza para validar la igualdad de objetos.

assert.strictDepEqual({a: '1'}, {a: 1}), Similar a `.strictEqual`. Se utiliza para validar la igualdad de 2 objetos, incluyendo el tipo de sus valores.

```javascript
const { test, describe } = require('node:test')

describe('sum of', () => {
    test('2 plus 3', () => {
        const sum = 2 + 3

        assert.strictEqual(sum, 5) // true
    })
})
```

# Probando el backend

## Entorno de prueba

La convencion de Node es definir el modo de ejecucion de la aplicacion con la variable de entorno `NODE_ENV=`.

Es una practica comun definir modos separados para desarrollo y produccion.

```json
{
    "scripts": {
        "start": "NODE_ENV=production node index.js",
        "dev": "NODE_ENV=development nodemon index.js",
        "test": "NODE_ENV=development node --test",
        "build:ui": "rm -rf ./dist && npm run build && rm -rf ./backend/dist && cp /dist ./backend"
    }
}
```

- Se ha especificado en el `package.json` el modo de la aplicacion para que sea _development_ con el script `npm run dev`, el cual utiliza el paquete _nodemon_.
- Se especifica que el comando predeterminado `npm start` definira el modo del entorno como _production_.

Los scripts anteriormente definidos por defecto no funcionaran en Windows. El error se corrige instalado el paquete `cross-env` como una dependencia de desarrollo.

```bash
npm install cross-env -D
```

La compatibilidad multiplataforma se logra utilizando la libreria `cross-env` en lo scripts definidos en el package.json.

```json
{
    "scripts": {
        "start": "cross-env NODE_ENV=production node index.js",
        "dev": "cross-env NODE_ENV=development nodemon index.js",
        "test": "cross-env NODE_ENV=development node --test",
    }
}
```

## Supertest

_supertest_ es un paquete que permite definir pruebas para probar API's

```javascript
const { test, after } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
```

La aplicacion importada se envuelve con la funcion `supertest()` en un objeto llamado `superagent`. Este objeto se asigna a la variable api y las pruebas pueden utilizar dicha variable para realizar solicitudes HTTP al backend.

```javascript
const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
```

Se realiza una peticion HTTP GET a la URL `/api/notes` y se verifica que la peticion se responda con:
- El codigo de estado 200
- Que el encabezado contenga el `Content-Type application/json`

Una vez que las pruebas se terminen de ejecutar, el metodo `after()` permite definir la logica para cerrar la conexion a la base de datos

```javascript
after(async () => {
    await mongoose.connection.close()
})
```

## Before

Para realizar pruebas robustas es necesario resetear la base de datos y generar los datos de prueba necesarios de manera controlada.

La libreria `node:test` ofrece muchas funciones que pueden ejecutar operaciones antes y despues de la realizacion de una prueba.

```javascript
const { test, beforeEach } = require('node:test')

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true
    }
]
```

Las siguientes pruebas almacenan la respuesta de la solicitud en la variable `response`.

```javascript
test('there are two notes', async() => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, initialNotes.length)
})

test('the first note is about HTTP methods', async() => {
    const response = await api.get('/api/notes')

    const content = response.body.map(e => e.content)

    // Se puede simplificar la prueba realizado utilizando unicamente el metodo assert, cuando se comprueban 2 valores booleanos
    assert(content.includes('HTML is easy'), true)
})
```

La funcion `beforeEach()` inicializa la base de datos antes de cada prueba.

La base de datos se borra y luego se guardan las 2 notas almacenadas en el array initialNotes.

```javascript
beforeEach(async() => {
    await Note.deleteMany({})
    let noteObject = await Note(initialNotes[0])
    await noteObject.save()
    noteObject = await Note(initialNotes[1])
    await noteObject.save()
})
```

## only

```javascript
const { test } = require('node:test')
const app = require('../app')

const supertest = require('supertest')

const api = supertest(app)
```

El comando `npm test` ejecuta todas las pruebas de la aplicacion.

El metodo `only` permite definir en el codigo que pruebas deben ser ejecutadas.

```javascript
test.only('notes are returned as json', async() => {
    api
        .get('/api/notes')
        .expect('Content-Type', /application\/json/)
})
```

Cuando las pruebas son ejecutadas con el comando `npm test -- --test-only`, solo los test marcados con only seran ejecutados`

## async/await

La sintaxis `async/await` hace posible el uso de funciones asincronas que devuelven una promesa de una forma que hace parecer al codigo sincrono.

```javascript
const Note = require('../models/Note')

Note.find({})
    .then(notes => {
        console.log('operation returned the following notes', notes)
    })
```

- El metodo `find()` retorna una promesa, pudiendo acceder al resultado de esta registrando una funcion callback con el metodo `then`.
- Todo el codigo que se quiere ejecutar una vez finalice la operacion asincrona esta escrito dentro de la funcion callback.
- Si se quisieran realizar varias llamadas a funciones asincronas en secuencia, estas deberian realizarse en el callback, dando como resultado un infierno de callbacks.
- El encadenamiento de promesas podria ayudar a evitar el infierno de callbacks mediante llamadas a metodos `then()`.

```javascript
Note.find({})
    .then(notes => notes[0].remove())
    .then(response => {
        console.log('the first note is removed')
    })
```

En el siguiente ejemplo, la ejecucion del codigo se detiene gracias a la palabra clave `await` y se espera a que se cumpla la promesa para continuar con la ejecucion del resto del codigo.

El resultado de la operacion que devolvio la promesa se asigna a la variable notes.

```javascript
const main = async() => {
    // La palabra clave await no se puede ejecutar en cualquier parte del codigo JavaScript, ya que solo es posible su uso dentro de una funcion async
    const notes = await Note.find({})
    console.log('operation returned the following notes', notes)
}
```

## Promise.all

`Promise.all()` recibe como parametro un arreglo de promesas, las cuales transforma en una unica promesa.

Si al menos una de las promesas del arreglo se rechaza, la promesa devuelta por `Promise.all()` sera una promesa rechazada.

```javascript
const Note = require('../models/notes')
const helper = require('./test_helper')

const { test } = require('node:test')

beforeEach(async() => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const notesSaved = noteObjects.map(note => note.save())

    await Promise.all(notesSaved)
})
```

## Ejecutar pruebas una por una

```json
"scripts": {
    "test": "cross-env NODE_ENV=test node --test"
}
```

```bash
npm run test -- --test-only
```

El metodo `only` permite definir en el codigo que pruebas deben ser ejecutadas.

```javascript
test.only()
```

# Administracion de usuarios

## Administracion de usuarios

### Relacion uno a varios

Un unico usuario puede crear multiples registros

```bash
USER |-< NOTE
```

En las bases de datos de documentos como MongoDB, se puede usar el `id` de los objetos para referenciar a documentos de otras colecciones, de forma similar al uso de claves externas en bases de datos relacionales.

### Referencias entre columnas

Cuando se trabaja con bases de datos relacionales, los registros de una tabla se referencian mediante claves foraneas con los registros de otra tabla.

En las bases de datos de documentos se puede hacer lo mismo.

```json
[
    {
        username: 'milukas',
        _id: 123456
    },
    {
        username: 'hellas',
        _id: 654321
    }
]
```

En el ejemplo anterior la coleccion `users` contiene 2 usuarios.

```json
[
    {
        content: 'HTML is easy',
        important: false,
        _id: 221222,
        user: 123456
    },
    {
        content: 'A proper dinosaur codes with Java',
        important: true,
        _id: 221223,
        user: 654321
    }
]
```

La coleccion `notes` contiene 2 notas que contienen un campo `user`, el cual hace referencia a un usuario en la coleccion users.

Las bases de datos de documentos ofrecen una forma diferente de organizar datos, por ejemplo anidando todo el conjunto de notas como parte de los documentos en la coleccion de usuarios.

```json
[
    {
        username: 'milukas',
        _id: 123456,
        notes: [
            {
                content: 'HTML is easy',
                important: false
            },
            {
                content: 'JavaScript is great',
                important: true
            }
        ]
    },
    {
        username: 'hellas',
        _id: 654321,
        notes: [
            {
                content: 'A proper dinosaur codes with Java',
                important: true
            }
        ]
    }
]
```

En el esquema anterior las notas estarian estrechamente anidadas bajo cada usuario y la base de datos no generaria identificadores unicos para dichas notas.

## Esquema de mongoose para usuarios

```javascript
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId, // El tipo de campo ObjectId hace referencia a documentos de tipo Note
            ref: 'Note'
        }
    ]
})
```

En el ejemplo anterior, los identificadores de las notas se almacenaran dentro del documento del usuario como una matriz de `ID's` de Mongo.

Dentro del modelo `Note` al que hace referencia el campo `notes` del esquema anterior, se debe añadir un nuevo campo que contenga informacion del usuario que creo dicha nota.

```javascript
const noteSchema = new mongoos.Schema({
    ...,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
```

A diferencia de las bases de datos relacionales, las referencias se almacenan en ambos documentos:
- La nota hace referencia al usuario que la creo.
- El usuario tienen una serie de referencias a todas las notas creadas por ellos.