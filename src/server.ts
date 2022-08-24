import http from 'http'
import app from './app'

const PORT = app.get('port')
const server = http.createServer(app).listen(PORT)

server.on('listening', () => console.log('Server listening on port %s...', PORT))
