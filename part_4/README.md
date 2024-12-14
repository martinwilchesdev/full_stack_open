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