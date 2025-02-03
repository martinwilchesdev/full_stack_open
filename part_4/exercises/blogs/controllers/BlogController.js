const BlogRouter = require('express').Router()

// Modelo Blog
const Blog = require('../models/BlogModel')

// Consultar los blogs contenidos en la base de datos
BlogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// Crear un nuevo blog
BlogRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const blog = new Blog(request.body)

    const blogs = await blog.save()

    response.status(201).json(blogs)
})

// Eliminar un blog
BlogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

// Modificar el contenido de un blog existente en la base de datos
BlogRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, {
        'author': request.body.author
    }, {new: true}) // el objecto options {new: true} retorna el objeto de la basde datos actualizado

    response.json(blog)
})

module.exports = BlogRouter