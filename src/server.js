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
		console.log(`\nConnected a socket[${clientSocket.id}]`)
		clientSockets.push(clientSocket)

		clientSocket.on('disconnecting', (reason) => {
			console.log(`\nDisconnecting a socket[${clientSocket.id}]: ${reason}`)

			const rooms = _.keys(clientSocket.rooms)
			const socketId = clientSocket.id
			rooms.forEach(roomId => {
				clientSocket.to(roomId).emit('leaveRoom', {
					roomId,
					socketId
				})
			})
		})

		clientSocket.on('disconnect', (reason) => {
			console.log(`\nDisconnected a socket[${clientSocket.id}]: ${reason}`)
			_.pull(clientSockets, clientSocket)
		})

		clientSocket.on('enterRoom', (data) => {
			const {roomId} = data
			const socketId = clientSocket.id
			console.log(`\nSocket[${clientSocket.id}] entered room[${roomId}]`)
			clientSocket.join(roomId, () => {
				clientSocket.to(roomId).emit('enterRoom', {
					roomId,
					socketId
				})
			})
		})

		clientSocket.on('updateState', (data) => {
			const {roomId, state} = data
			const socketId = clientSocket.id
			clientSocket.to(roomId).emit('updateState', {
				socketId,
				state
			})
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
