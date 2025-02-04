const BlogRouter = require('express').Router()

// Modelo Blog
const Blog = require('../models/BlogModel')
const User = require('../models/UserModel')

// Consultar los blogs contenidos en la base de datos
BlogRouter.get('/', async (request, response) => {
    // populate() permite referenciar documentos en otras colecciones
    // El metodo populate se encadena despues de que el metodo `find` realiza la consulta inicial
    const blogs = await Blog.find({}).populate('user')
    /**
     * El argumento dado al metodo populate() define que los ids que hacen referencia a objetos `user` en el campo user del documento Blog
     * seran reemplazados por los documentos de `user` referenciados.
    */


    response.json(blogs)
})

// Crear un nuevo blog
BlogRouter.post('/', async (request, response) => {
    const { author, likes, title, url } = request.body

    if (!title || !url) return response.status(400).end()

    // Se consultan todos los usuario
    const user = await User.find({})

    const blog = new Blog({
        user: user[0], // Se asocia al blog el usuario ubicado en la primera posicion
        author,
        likes,
        title,
        url
    })

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