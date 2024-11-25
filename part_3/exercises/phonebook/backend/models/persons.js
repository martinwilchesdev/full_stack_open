process.loadEnvFile()

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongo_uri = process.env.MONGO_URL

mongoose.connect(mongo_uri)
    .then(response => {
        console.log('Connected to database')
    })
    .catch(error => {
        console.log('Error connecting to database')
    })

const personSchema = mongoose.Schema({
    name: {
        minLength: 3,
        type: String
    },
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person