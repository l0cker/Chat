const express = require('express');
const path = require('path');
require('dotenv').config()
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('vieww engine', 'html')

app.use('/', (req, res) =>{
    res.render('index.html');
});

let messages =[];

io.on('connection', socket =>{
    console.log(`Socket Conectado ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data =>{
        messages.push(data);
        socket.broadcast.emit('receivedMessage',data);
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor OK'));