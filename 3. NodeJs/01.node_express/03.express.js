// Express.js es una libreria de NodeJs utilizada para abstraer los casos de uso generales que se requieren al construir un servidor backend
const express = require('express')

// La aplicacion de Express es almacenada en la variable app
const app = express()

const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'CSS is hard',
        important: false
    }
]


// Ruta de la aplicacion con un controlador de eventos que maneja las peticiones realizadas a la ruta /
app.get('/', (req, res) => {
    /**
     * El controlador de eventos retorna como respuesta mediante el metodo send() un string.
     * Dado que el parametro es un string, Express establece de forma automatica el valor del encabezado Content-Type en text/html.
     * El codigo predeterminado de la respuesta es 200.
    */
    res.send('<h1>Hello World</h1>')
})

// Ruta de la aplicacion con un controlador de eventos que maneja las peticiones realizadas a la ruta /notes
app.get('/notes', (req, res) => {
    // La ruta del servidor retorna como respuesta el arreglo proporcionado en formato JSON.
    res.json(notes)
})

/**
 * La funcion del controlador de eventos en ambos casos acepta 2 parametros.
 * - req (request) :: Contiene toda la informacion de la solicitud HTTP.
 * - res (response) :: Se utiliza para definir como se responde a la solicitud.
*/

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})