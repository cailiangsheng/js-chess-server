import express from 'express'
import { createServer } from 'http'
import socketIO from 'socket.io'

const app = express()
const server = createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
	console.log('connected a socket')
})

server.listen(3000, () => {

})
