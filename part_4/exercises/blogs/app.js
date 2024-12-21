process.loadEnvFile()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

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

module.exports = app