const mongoose = require('mongoose')
const express = require('express')

const password = process.argv[2]

const url = `mongodb+srv://martindotdev:${password}@fullstackopencluster.asrmplj.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpenCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
            delete returnedObject._id,
            delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

const app = express()

// El manejo de errores puede implementarse en un bloque de codigo separado a traves de un middleware
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
            /**
             * El error puede ser pasado o no a la funcion next().
             * Si no se pasa el parametro error a la funcion next(), la ejecucion pasaria a la siguiente ruta o middleware.
             * Si se invoca la funcion next() con el parametro error, la ejecucion continua en el middleware del controlador de errores.
             * Los controladores de errores de Express son middleware que se definen con una funcion que acepta 4 parametros.
             *      const errorHandler = (error, req, res, next) => {}
             *
             * Este debe ser el ultimo middleware cargado. Todas las rutas deben ser registradas antes que la definicion del controlador de errores.
            */
            next(error)
        })
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    // Dentro del middleware errorHandler se puede verificar el tipo de error y responder con un mensaje personalizado
    if (error.name === 'CastError') {
        res.status(400).json({ error: 'malformatted id' })
    }
}

app.use(errorHandler)