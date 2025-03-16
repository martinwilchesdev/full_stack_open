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

// Middleware a ejecutar antes de las rutas
app.use(middleware.tokenExtractor)

// Controladores
const loginRouter = require('./controllers/LoginController')
const userRouter = require('./controllers/UserController')
const blogRouter = require('./controllers/BlogController')

app.use(cors())
app.use(express.json())

// Rutas de los controladores
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)

module.exports = app