const UserRouter = require('express').Router()
const bcrypt = require('bcrypt')

// Modelo User
const User = require('../models/UserModel')

// Crear un nuevo usuario
UserRouter.post('/', async (req, res, next) => {
    const { username, password, name } = req.body

    // Se valida que contraseña tenga una longitud de al menos 3 caracteres
    if (password && password.length < 3) throw new Error('the password is too short')

    // Se encripta la contraseña mediante bcrypt
    const saltRounds = 10
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    // Se crea una instancia del modelo User, la cual contiene los datos recibidos desde la request
    const user = new User({
        password: encryptedPassword,
        username,
        name
    })

    // Se guarda el usuario en la base de datos de Mongo
    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = UserRouter