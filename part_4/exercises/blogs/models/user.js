const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String
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