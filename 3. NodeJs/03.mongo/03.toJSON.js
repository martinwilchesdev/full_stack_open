const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://martindotdev:${password}@fullstackopencluster.asrmplj.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpenCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean
})

/**
 * Los objetos devueltos por mongoose pueden ser modificados mediante el metodo `toJson` del esquema utilizado por todas las instancias de los modelos producidos por ese esquema, en este caso noteSchema.
 * En el siguiente ejemplo se añade una nueva propiedad id al objeto retornado, a partir de la propiedad _id la cual es formateada a tipo string.
 * Se elimnan ademas las propiedades (_id y __v) retornadas por el objeto.
 *
*/
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

// Instancia de un nuevo objeto Note
const notes = new Note({
    content: "HTML is easy",
    important: true
})