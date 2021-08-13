const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors())
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.get('/client', function (req, res) {
    res.sendFile(__dirname + '/public/client.html')
});

app.get('/cs', function (req, res) {
    res.sendFile(__dirname + '/public/cs.html')
});

app.post('/chat/cs', (req, res) => {
    const { chat } = req.body;
    req.io.sockets.emit('chat_cs', req.body.chat);
    res.send(req.body.chat);
});

app.post('/chat/client', (req, res) => {
    const { chat } = req.body;
    req.io.sockets.emit('chat_client', req.body.chat);
    res.send(req.body.chat);
});

io.on('connection', function (socket) {
    console.log('ok')
});

server.listen(3000)