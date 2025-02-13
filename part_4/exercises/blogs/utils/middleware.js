process.loadEnvFile()

const jwt = require('jsonwebtoken')

function errorHandler(err, req, res, next) {
    if (err.message.includes('E11000 duplicate key')) {
        res.status(409).json({ error: 'the username must be unique' })
    } else {
        res.status(400).json({ error: err.message })
    }
}

// La funcion auxiliar `tokenExtractor` aisla el token del encabezado `authorization`
function tokenExtractor(req, res, next) {
    // Se obtiene el valor del header authorization
    const authorization = req.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        // Si el valor de authorization inicia con Bearer, se remplaza con una cadena vacia
        req.token = authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }
    next()
}

function userExtractor(req, res, next) {
    // La validez del token se comprueba mediante `jwt.verify`. Este metodo devuelve el objeto en el que se baso el token
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken) return res.status(401).json({error: 'token invalid'})

    req.user = decodedToken // Se asigna el token decodificado a la propiedad user de la request

    next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }