const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = 3001

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

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

app.get('/api/persons', (req, res) => {
    res.json({persons: persons})
})

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => Number(person.id) === Number(req.params.id))
    if (person) {
        res.json({person: person})
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => Number(person.id) === id)
    if (person.length > 0) {
        persons = persons.filter(person => Number(person.id) !== Number(id))
        res.status(204).end()
    } else {
        res.status(404).end()
    }
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