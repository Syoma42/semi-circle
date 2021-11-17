const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

  
io.on('connection', socket => {
    socket.emit('test event', 'here is some data1111');
});

server.listen(3000, () => {
    console.log('Socket IO server is listening at port 3000');
})

