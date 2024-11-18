// MaLn22ZqPpUSTy7i
const mongoose = require('mongoose')

const password = process.argv[2]
const userName = process.argv[3]
const userNumber = process.argv[4]

const uri = `mongodb+srv://martindotdev:${password}@firstcluster.laqkx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FirstCluster`

mongoose.connect(uri)
    .then(response => {
        console.log('Successfull connection')
    })
    .catch(error => {
        console.log('Database connection error ', error)
    })

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (userName && userNumber) {
    const person = new Person({
        name: userName,
        number: userNumber
    })

    person.save()
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log('Error ', error)
        })
        .finally(() => {
            console.log('Connection closed')
            mongoose.connection.close()
        })
} else {
    Person.find({})
        .then(response => {
            console.log(`phonebook:`)
            response.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        })
        .catch(error => {
            console.log('Error ', error)
        })
        .finally(() => {
            console.log('Connection closed')
            mongoose.connection.close()
        })
}
