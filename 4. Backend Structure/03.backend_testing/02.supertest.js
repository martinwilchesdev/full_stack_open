// supertest es un paquete que permiten escribir pruebas para probar API's
const { test, after } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

/**
 * La aplicacion importada se envuelve con la funcion supertest() en un objeto llamado `superagent`.
 * Este objeto se asigna a la variable api y las pruebas pueden utilizar dicha variable para realizar solicitudes HTTP al backend. 
*/
const api = supertest(app)

/**
 * Se realiza una peticion HTTP GET a la URL /api/notes y se verifica que la peticion se responda con:
 * El codigo de estado 200
 * Que el encabezado contenga el Content-Type application/json
*/
test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// Una vez que las pruebas se terminen de ejecutar, el metodo after() define la logica para cerrar la conexion a la base de datos
after(async () => {
    await mongoose.connection.close()
})