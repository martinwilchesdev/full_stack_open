// El enrutador es un middleware que se puede utilizar para definir rutas relacionadas en un solo lugar, normalmente colocadas en su propio modulo
const notesRouter = require('express').Router()

// Todas las rutas se definen para el objeto enrutador en lugar de la aplicacion completa, eg, app.get()
notesRouter.get()

// El enrutador de express se exporta para que este disponible para todos los consumidores del modulo
module.exports = notesRouter

// El archivo que crea la aplicacion real `app.js` importa el enrutador 
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

/**
 * El enrutador definido se usa si la URL de la solicitud comienza con /api/notes.
 * Por esta razon, el objeto notesRouter solo debe definir las partes relativas de las rutas, es decir la ruta vacia / o el parametro /:id.
*/

// controllers/notes.js
notesRouter.post('/:id', () => {
    res.json({message: 'Test'})
})

// La peticion realizada a la URL http://localhost:3001/api/notes/1 se capturara por el controlador anteriormente definido