const express = require('express')

// Es posible permitir solicitudes de otros origenes utilizando el middleware cors de Node
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ content: 'Node.js' })
})

app.get('/api/notes', (req, res) => {
    res.json([{
        "id": "dce6",
        "content": "HTML is kwai",
        "important": false
    }])
})

app.listen(3001)