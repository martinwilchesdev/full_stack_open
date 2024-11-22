const express = require('express')
const morgan = require('morgan')
const app = express()

// Mongo model
const Person = require('./models/persons')

const PORT = 3001

let persons = []

app.use(express.static('dist'))

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    const body = Object.values(req.body).length > 0 ? JSON.stringify(req.body) : ''
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        body
    ].join(' ')})
)

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(response => {
            const data = response
            res.json({persons: data})
        })
        .catch(error => {
            next(error)
        })
})

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => Number(person.id) === Number(req.params.id))
    if (person) {
        res.json({person: person})
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(response => {
            res.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

app.post('/api/persons', (req, res) => {
    const id = Number(persons[persons.length -1]?.id) || 1
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({"error": "Invalid name or number"})
    } else {
        const newPerson = {
            id: id + 1,
            name: body.name,
            number: body.number
        }

        if (persons.find(person => person.name === body.name)) {
            res.status(409).json({"error": "name must be unique"})
        } else {
            persons = [...persons, newPerson]
            res.status(201).end()
        }
    }
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        res.status(400).send({'error': 'Malformatted id'})
    } else {
        res.status(500).end()
    }
}

app.use(errorHandler)