function errorHandler(err, req, res, next) {
    if (err.message.includes('E11000 duplicate key')) {
        res.status(409).json({ error: 'the username must be unique' })
    } else {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    errorHandler
}