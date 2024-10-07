// Importacion del modulo de servidor web integrado en NodeJs
const http = require('http')

/**
 * El metodo createServer() del modulo http crea un nuevo servidor web.
 * Se registra un controlador de eventos en el servidor, el cual se invoca cada vez que se realizan peticiones HTTP a la direccion del servidor que sea configurada.
*/
const app = http.createServer((req, res) => {
    /**
     * La siguiente peticion se responde con el codigo de estado 200.
     * El valor text/plain en la cabecera Content-Type le informa al receptor que los datos estan en formato de texto plano.
    */
    res.writeHead(200, {'Content-Type': 'text/plain'})

    // El contenido de la respuesta del servidor es el string 'Hello World'
    res.end('Hello World')
})

// Puerto de ejecucion del servidor
const PORT = 3001

// Se adjunta el puerto de ejecucion del servidor con la variable a la cual se asigno el servidor, para asi escuchar las peticiones HTTP realizadas
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})