const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJson', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject.__id.toString()
        delete returnedObject.__id
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User