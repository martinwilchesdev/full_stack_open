const {test, after} = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app')
const { mongoose } = require('mongoose')

const api = supertest(app)

test('there are one blog', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const result = response.body

    assert.equal(result.length, 1)
})

after(async() => {
    mongoose.connection.close()
})