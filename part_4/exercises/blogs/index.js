process.loadEnvFile()

const express = require('express')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})