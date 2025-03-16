const { test, describe, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')

const mongoose = require('mongoose')

const app = require('../app')
const api = supertest(app)

const User = require('../models/UserModel')

describe('create valid users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('password with at least 3 characters is correct', async() => {
        const newUser = {
            username: 'Alan Turing',
            password: 'Aa1',
            name: 'Alan Turing',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .set('Accept', 'application/json')
    })
})

after(async() => {
    mongoose.connection.close()
})