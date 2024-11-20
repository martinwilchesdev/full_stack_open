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
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person