import express from 'express'
import { createServer } from 'http'
import io from 'socket.io'

const app = express()
const server = createServer(app)
const socket = io(server)

const startServer = (port) => {
	socket.on('connection', (clientSocket) => {
		console.log('connected a socket')
	})

	server.listen(port, () => {
		console.log('server listening on', port, '...')
	})
}

export {
	startServer
}

