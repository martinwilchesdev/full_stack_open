const mongoose = require('mongoose')

// Los identificadores de las notas se almacenaran dentro el documento del usuario como una matriz de IDs de Mongo
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

/**
 * Dentro del modelo Note al que hace referencia el campo notes, se debe añadir un nuevo campo que contenga informacion del usuario que creo dicha nota
 *      const noteSchema = new mongoos.Schema({
 *          ...,
 *          user: {
 *              type: mongoose.Schema.Types.ObjectId,
 *              ref: 'User'
 *          }
 *      })
 *
 * A diferencia de las bases de datos relacionales, las referencias se almacenan en ambos documentos:
 *  - La nota hace referencia al usuario que la creo.
 *  - El usuario tienen una serie de referencias a todas las notas creadas por ellos.
*/

userSchema.set('toJSON', {
    transform: (document, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
        // El password hash no debe mostrarse
        delete obj.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User