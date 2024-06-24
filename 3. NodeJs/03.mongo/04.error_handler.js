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

app.get('/api/notes/:id', (req, res) => {
    // Si se trata de acceder a un recurso que no existe en la base de datos, la respuesta obtenida sera null
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                // Si el recurso con el identificador dado no existe el servidor responde la solicitud con el codigo de estado 404 NOT FOUND
                res.status(404).end()
            }
        })
        .catch(error => {
            /**
             * El bloque catch se implementa para manejar los casos en los que la promesa devuelta por el metodo findById() es rechazada.
             * Uno de los motivos de rechazo de la promesa puede darse cuando se pasa como parametro con un tipo de id incorrecto.
            */
            console.log('Error:', error.message)
            res.status(400).json({ error: 'malformatted id' })
        })
})