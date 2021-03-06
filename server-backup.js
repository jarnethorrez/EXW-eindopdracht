const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

const https = require('https');
const fs = require('fs');
const port = 8080;

// Static files
app.use('/', express.static('public'));

let vr;
let options = {};
const serverCallback = () => console.log(`App listening on port ${port}!`);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

io.on('connection', socket => {
  console.log(`Client connected ${socket.id}`);

  socket.on(`swimToServer`, data => {
    console.log(data);
    io.sockets.emit(`swimToClient`, data);
  });

});

// https
if (process.env.NODE_ENV === "development") {
  options = {
    key: fs.readFileSync('./config/sslcerts/key.pem'),
    cert: fs.readFileSync('./config/sslcerts/cert.pem')
  };
  https.createServer(options, app).listen(port, serverCallback);
} else {
  app.listen(port, serverCallback);
}
