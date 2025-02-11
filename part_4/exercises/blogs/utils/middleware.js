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

module.exports = { errorHandler, tokenExtractor }