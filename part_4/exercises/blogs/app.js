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

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    })
})

module.exports = app