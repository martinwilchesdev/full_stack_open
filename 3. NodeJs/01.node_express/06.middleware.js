const express = require('express')
const app = express()

/**
 * Los middleware son funciones que se pueden utilizar para manejar objetos request y response.
 * El middlware json-parser toma los datos sin procesar de las solicitudes que estan almacenadas en el objeto request, los parsea en un objeto de JavaScript y lo asigna en el request como una nueva propiedad body.
 * Cuando se tienen mas de un middleware se ejecutan uno por uno en el orden en el que se definieron en el codigo de la aplicacion.
*/
app.use(express.json())

/**
 * Un middleware es una funcion que recibe 3 parametros.
 * Al final del cuerpo de la funcion se llama a la funcion `next` que se paso como parametro. Esta funcion cede el control al siguiente middleware.
*/
const requestLogger = (req, res, next) => {
    console.log('Method ', req.method)
    console.log('Path ', req.path)
    console.log('Body ', req.body)
    console.log('---')
    next()
}

// El middleware se utiliza de la siguiente forma
app.use(requestLogger)

// Las funciones middleware deben definirse antes que las rutas cuando se quiere que estos sean ejecutados por los controladores de eventos de ruta
app.get('/', (req, res) => {
    res.json({ content: 'Node.js' })
})

// Cuando las funciones de middleware son llamadas sin que ningun controlador de rutas se encargue de la solicitud HTTP, las funciones middleware pueden ser definidas despues de las rutas
const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

// El middleware se usa para capturar solicitudes realizadas a rutas inexistentes.
app.use(unknownEndpoint)

app.listen(3001)