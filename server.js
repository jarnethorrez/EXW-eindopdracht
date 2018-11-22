const express = require('express');
const socket = require('socket.io');
let vr;

// App setup
const app = express();
const server = app.listen(8080, () => {
  console.log(`Listening on 8080`);
})

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', socket => {
  console.log(`Client connected ${socket.id}`);

  socket.on(`swimToServer`, data => {
    console.log(data);
    io.sockets.emit(`swimToClient`, data);
  });

});
