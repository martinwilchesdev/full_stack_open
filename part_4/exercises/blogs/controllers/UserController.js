const UserRouter = require('express').Router()
const bcrypt = require('bcrypt')

// Modelo
const User = require('../models/UserModel')

// Creacion de usuarios
UserRouter.post('/', async (req, res, next) => {
    const { username, password, name } = req.body

    const saltRounds = 10

    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({
        password: encryptedPassword,
        username,
        name
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = UserRouter