const {test, after} = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')

const { mongoose } = require('mongoose')

const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

test('validate blogs lenght', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const result = response.body

    // assert.equal(result.length, 1)
})

test('validate property id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const result = response.body.every(blog => Object.hasOwn(blog, 'id'))

    assert(result, true)
})

test('validate creation of a new blog', async () => {
    const initialBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .send({
            author: 'Ada Lovelace',
            likes: 3,
            title: 'A test book title',
            url: 'http://testbook.com',
        })
        .set('Content-Type', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)

    const blogsUpdated = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.equal(blogsUpdated.body.length, initialBlogs.body.length + 1)
})

test('POST request object contains likes property', async () => {
    const response = await api
        .post('/api/blogs')
        .send({
            author: 'Ada Lovelace',
            likes: 3,
            title: 'A test book title',
            url: 'http://testbook.com',
        })
        .set('Content-Type', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)

    assert(Object.hasOwn(response.body, 'likes'), true)
})

test('server returns status code 400 if title and url property doesn\t exist on the request', async () => {
    const response = await api
        .post('/api/blogs')
        .send({
            author: 'Ada Lovelace',
            likes: 3
        })
        .set('Content-Type', 'application/json')
        .expect(400)
})

after(async() => {
    mongoose.connection.close()
})