import express from 'express'
import { createServer } from 'http'
import socketIO from 'socket.io'

const app = express()
const server = createServer(app)
const io = socketIO(server)

const startServer = (port) => {
	io.on('connection', (socket) => {
		console.log('connected a socket')
	})

	server.listen(port, () => {
		console.log('server listening on', port, '...')
	})
}

export {
	startServer
}

