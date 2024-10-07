const express = require('express')

const app = express()

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'CSS is hard',
        important: false
    },
    {
        id: 3,
        content: 'JavaScript is weird',
        important: true
    }
]

/**
 * Representational State Transfer, tambien conocido como REST es un estilo arquitectonico destinado a la creacion de aplicaciones web escalables.
 * Las cosas singulares como las notas en el objeto `notes` se denominan recursos en el pensamiento REST.
 * Cada recurso tiene una URL asociada que es la direccion unica del recurso.
 * Una convencion es crear la direccion unica para los recursos combinando el nombre del tipo de recurso (notes) con el identificador unico del recurso (id).
 *
 *    notes/10      GET       Se obtiene un solo recurso
 *    notes         GET       Se obtienen todos los recuros de una coleccion
 *    notes         POST      Se crea un nuevo recurso basado en los datos de la solicitud
 *    notes/10      DELETE    Se elimina el recurso identificado
 *    notes/10      PUT       Se reemplaza todo el recurso identificado con los datos de la solicitud
 *    notes/10      PATCH     Se reemplaza una parte del recurso identificado con los datos de la solicitud
*/
app.get('/', (req, res) => {
    res.send('<h1>Node.js and Express</h1>')
})

app.get('/notes', (req, res) => {
    res.json(notes)
})

/**
 * Los parametros para las rutas en Express son definidas utilizando la sintaxis de 2 puntos `/:param`.
 * La siguiente ruta manejara todas las peticiones HTTP GET que tengan el formato /notes/SOMETHING, en donde SOMETHING es un string arbitrario.
*/
app.get('/notes/:id', (req, res) => {
    // El parametro "id" de la ruta puede ser accedido mediante el objeto "request" de la peticion
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end() // 404 NOT FOUND
    }
})

/**
 * La eliminacion de recursos en el servidor ocurre al realizar una solicitud HTTP DELETE a la URL.
 * La URL recibe como parametro el id del recurso a eliminar.
*/
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end() // 204 NO CONTENT
})

/**
 * La adicion de un nuevo recurso al servidor ocurre al realizar una solicitud HTTP POST a la direccion /notes.
 * La informacion de la nueva nota se envia en el body de la solicitud en formato JSON.
 * Para acceder a los datos del body de la peticion se utiliza el `json-parser` de Express.
 *    app.use(express.json()) // Todas las rutas de la aplicacion tendran acceso a la funcionalidad del `json_parser`
 *
 * El json-parser toma los datos JSON de la peticion, los transforma en un objeto de JavaScript y luego los adjunta a la propiedad body del objeto request antes de llamar al controlador de la ruta.
*/
app.post('/notes', (req, res) => {
    const resource_id = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
    const body = req.body

    if (!body.content) return res.status(400).json({ error: 'Content is missing' })

    const note = {
        important: Boolean(body.important) || false,
        content: body.content
    }

    note.id = resource_id + 1

    notes = notes.concat(note)
    res.status(201).end() // 201 CREATED
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})