import express from 'express'
import { createServer } from 'http'
import io from 'socket.io'
import _ from 'lodash'

const app = express()
const server = createServer(app)
const socket = io(server)

let clientSockets = null

const startServer = (port) => {
	if (clientSockets) return clientSockets

	clientSockets = []

	socket.on('connection', (clientSocket) => {
		console.log('Connected a socket')
		clientSockets.push(clientSocket)

		clientSocket.on('disconnect', (reason) => {
			console.log('Disconnected a socket')
			_.pull(clientSockets, clientSocket)
		})

		clientSocket.on('hello', (data) => {
			console.log('hello', data)
		})
	})

	server.listen(port, () => {
		console.log('Server listening on', port, '...')
	})

	return clientSockets
}

export {
	startServer
}
