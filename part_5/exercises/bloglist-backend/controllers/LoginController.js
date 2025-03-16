process.loadEnvFile()

const LoginRouter = require('express').Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Modelos
const User = require('../models/UserModel')

LoginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const validatePassword = user === null ?
        false :
        // Mediante el metodo `bcrypt.compare` se compara la contraseña enviada en la request con la del usuario guardado en base de datos
        await bcrypt.compare(password, user.password)

    if (!validatePassword) return res.status(401).json({error: 'invalid username or password'})

    /**
     * Si la contraseña es correcta se crea un token con el metodo `jwt.sign`
     * El token contiene el nombre de usuario y su id en un formato firmado digitalmente
    */
    const userToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).send({
        token,
        name: user.name,
        username: user.username
    })
})

module.exports = LoginRouter