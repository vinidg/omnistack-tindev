const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('./config/enviroments')

const routes = require('./routes')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query
    
    connectedUsers[user] = socket.id
})

mongoose.connect(env.BaseUri, {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3333
server.listen(PORT)