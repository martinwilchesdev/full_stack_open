process.loadEnvFile()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

const Blog = require('./models/blog')

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

module.exports = app