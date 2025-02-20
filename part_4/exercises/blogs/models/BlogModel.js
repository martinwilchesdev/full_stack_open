const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author: String,
    likes: Number,
    title: String,
    url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog