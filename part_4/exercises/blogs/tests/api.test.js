const {describe, test, after, beforeEach} = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')

const Blog = require('../models/BlogModel')
const { mongoose } = require('mongoose')

const app = require('../app')
const api = supertest(app)

describe('when test is initially, database registers are deleted', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    })

    describe('viewing a specific blog', () => {
        test('validate blogs lenght', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const result = response.body

            assert.equal(result.length, 0)
        })

        test('validate property id', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const result = response.body.every(blog => Object.hasOwn(blog, 'id'))

            assert(result, true)
        })
    })

    describe('creating new registers', () => {
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
    })

    describe('validate object props when a POST request is made', () => {
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
            await api
                .post('/api/blogs')
                .send({
                    author: 'Ada Lovelace',
                    likes: 3
                })
                .set('Content-Type', 'application/json')
                .expect(400)
        })
    })

    describe('delete the only blog that database contains', () => {
        test('returns and empty object', async () => {
            const blog = await api
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

            await api
                .delete(`/api/blogs/${blog.body.id}`)
                .expect(204)

            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.equal(response.body.length, 0)
        })
    })

    describe('update the blog info', () => {
        test.only('author updated', async () => {
            const blog = await api
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

            const response = await api
                .put(`/api/blogs/${blog.body.id}`)
                .send({
                    author: 'Hemingway'
                })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.equal(response.body.author, 'Hemingway')
        })
    })
})

after(async() => {
    mongoose.connection.close()
})
