const BlogRouter = require('express').Router()

// Modelo Blog
const Blog = require('../models/BlogModel')
const User = require('../models/UserModel')

// Consultar los blogs contenidos en la base de datos
BlogRouter.get('/', async (req, res) => {
    // populate() permite referenciar documentos en otras colecciones
    // El metodo populate se encadena despues de que el metodo `find` realiza la consulta inicial
    const blogs = await Blog.find({}).populate('user')
    /**
     * El argumento dado al metodo populate() define que los ids que hacen referencia a objetos `user` en el campo user del documento Blog
     * seran reemplazados por los documentos de `user` referenciados.
    */


    res.json(blogs)
})

// Crear un nuevo blog
BlogRouter.post('/', async (req, res) => {
    const { author, likes, title, url } = req.body

    if (!title || !url) return res.status(400).end()

    // Se consultan todos los usuario
    const user = await User.findById(req.body.user)

    const blog = new Blog({
        user: user.id, // Se asocia al blog el usuario ubicado en la primera posicion
        author,
        likes,
        title,
        url
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id) // El id del blog creado se añade al array de blogs vinculados al usuario
    await user.save()

    res.status(201).json(savedBlog)
})

// Eliminar un blog
BlogRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).end()
})

// Modificar el contenido de un blog existente en la base de datos
BlogRouter.put('/:id', async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        'author': req.body.author
    }, {new: true}) // el objecto options {new: true} retorna el objeto de la basde datos actualizado

    res.json(blog)
})

module.exports = BlogRouter