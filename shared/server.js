import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import http from 'http'
import { WebSocketServer } from 'ws'
import { spawn } from 'child_process'
import createProjectFromState from './createProject.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json());
app.use(express.static('web/dist'))

const server = http.createServer(app)
const socketServer = new WebSocketServer({ server })
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/web/dist/', 'index.html'))
})

// Handle the initial fetch request
app.get('/start', (req, res) => {
  streamToClient('Hello')
});

app.post('/createProject', (req, res) => {
  const state = req.body;
  console.log(state);
  // for web instances we should figure out a way to get the folder
  state.projectDir = path.resolve(__dirname, '..', '.exported_projects');

  createProjectFromState(state);
})

socketServer.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    if (data == 'CLI') {
      console.log('do cli input')

      let lsSpawn = spawn('ls')
      lsSpawn.stdout.on('data', (data) => {
        ws.send('stdout')
        ws.send(data.toString())
      })
      lsSpawn.stderr.on('data', (data) => {
        ws.send('error')
        ws.send(data.toString())
      })
    } else {
      console.log('received: %s', data)
    }
  })

  // ws.send('something');
})

// server.on('upgrade', (req, socket, head) => {
//   const { url } = req;

//   // Only handle WebSocket upgrades for a specific path
//   if (url === '/ws') {
//     debugger;
//     socketServer.handleUpgrade(req, socket, head, (ws) => {
//       socketServer.emit('connection', ws, req);
//     });
//   } else {
//     // Otherwise, destroy the socket
//     socket.destroy();
//   }
// });

const streamToClient = (message) => {
  const messageString = JSON.stringify(message)

  socketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString)
    }
  })
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
