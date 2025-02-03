require('express-async-errors')

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

// Conexion a la base de datos de MongoDB con mongoose
const { MONGO_URI } = require('./utils/config')
mongoose.connect(MONGO_URI)

// Middlewares
const middleware = require('./utils/middleware')

// Controladores
const userRouter = require('./controllers/UserController')
const blogRouter = require('./controllers/BlogController')

app.use(cors())
app.use(express.json())

// Rutas de los controladores
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)

module.exports = app