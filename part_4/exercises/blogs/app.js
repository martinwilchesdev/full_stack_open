process.loadEnvFile()

const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()

const Blog = require('./models/blog')
const User = require('./models/user')

const { MONGO_URI } = require('./utils/config')

app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URI)

app.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const blog = new Blog(request.body)

    const blogs = await blog.save()
    response.status(201).json(blogs)
})

app.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

app.put('/api/blogs/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, {
        'author': request.body.author
    }, {new: true}) // el objecto options {new: true} retorna el objeto de la basde datos actualizado

    response.json(blog)
})

// Creacion de usuarios
app.post('/api/users', async (req, res) => {
    const { username, password, name } = req.body

    const saltRounds = 10
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({
        password: encryptedPassword,
        username,
        name
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = app