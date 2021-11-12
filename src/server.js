import http from 'http'
import WebSocket from 'ws'
import express from 'express'

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views')
app.use('/public', express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.render('home')
})

const httpServer = http.createServer(app)

const wss = new WebSocket.Server({ server: httpServer })
const sockets = []

wss.on('connection', (socket) => {
  sockets.push(socket)
  socket['nickname'] = '익명'
  console.log('connected to Browser ✨')

  socket.on('message', (msg) => {
    const message = JSON.parse(msg.toString())
    console.log(message)
    switch (message.type) {
      case 'message':
        sockets.forEach((s) => s.send(`${socket.nickname}:${message.payload}`))
      case 'nickname':
        socket['nickname'] = message.payload
    }
  })

})

httpServer.listen(4000, () => console.log(`Listening on http://localhost:4000`))
