/**
 * mongoose dispone de una forma de validacion en el formato de los datos, antes de que estos se almacenen en la base de datos.
 * Es posible definir reglas de validacion especificas para cada campo en el esquema.
*/
const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://martindotdev:${password}@fullstackopencluster.asrmplj.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpenCluster`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    // El campo content debe tener al menos cinco caracteres de longitud, es requerido y de tipo String.
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

/**
 * La accion update omite por defecto las validaciones definidas en el esquema.
 * Para admitir las validaciones es necesario añadir un objeto como tercer argumento, `{runValidators: true}`.
*/
app.put('/api/notes/:id', (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        .then(response => {
            res.json(response)
        })
})