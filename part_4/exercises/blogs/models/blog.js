const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author: String,
    likes: Number,
    title: String,
    url: String,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog