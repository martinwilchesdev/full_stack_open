process.loadEnvFile()

const BlogRouter = require('express').Router()

// Modelo Blog
const Blog = require('../models/BlogModel')
const User = require('../models/UserModel')

const jwt = require('jsonwebtoken')

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

    if (!title && !url) return res.status(400).json({ error: 'missing title and url' })

    // Se consultan todos los usuario
    const user = await User.findById(req.user.id)

    const blog = new Blog({
        user: user.id, // Se asocia al blog el usuario autenticado
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
    // Se obtiene el blog a eliminar. Mediante `populate` se obtienen los datos del usuario relacionado al blog
    const blog = await Blog.findById(req.params.id).populate('user')

    if (!blog) return res.status(404).json({ error: 'the provided blog doesn\'t exist' })

    // Se valida que el id del usuario obtenido del token decodificado sea igual al id del usuario asociado al blog
    if (req.user.id === blog.user.id) {
        // Se elimina el blog de la base de datos
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)

        // Se desvincula el blog del usuario que lo ha creado
        const user = await User.findById(blog.user.id)
        user.blogs = user.blogs.filter(blog => blog.toString() !== deletedBlog.id)
        await user.save()

        return res.status(204).end()
    }

    res.status(401).end()
})

// Modificar el contenido de un blog existente en la base de datos
BlogRouter.put('/:id', async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        'author': req.body.author
    }, {new: true}) // el objecto options {new: true} retorna el objeto de la basde datos actualizado

    res.json(blog)
})

module.exports = BlogRouter