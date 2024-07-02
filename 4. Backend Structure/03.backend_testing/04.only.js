const { test } = require('node:test')
const app = require('../app')

const supertest = require('supertest')

const api = supertest(app)

/**
 * El comando npm test ejecuta todas las pruebas de la aplicacion.
 * El metodo only permite definir en el codigo que pruebas deben ser ejecutadas.
*/
test.only('notes are returned as json', async() => {
    api
        .get('/api/notes')
        .expect('Content-Type', /application\/json/)
})

// Cuando las pruebas son ejecutadas con el comando npm test -- --test-only, solo los test marcados con only seran ejecutados