const express = require('express');
const app = express();
const isDevelopment = (process.env.NODE_ENV === "development");

const https = require('https');
const fs = require('fs');
const port = 8080;
let options = {};
let ipAddress;

let server;
if (isDevelopment) {
  options = {
    key: fs.readFileSync('./config/sslcerts/key.pem'),
    cert: fs.readFileSync('./config/sslcerts/cert.pem')
  };
  server = https.createServer(options, app);
} else {
  server = require('http').Server(app);
}

const io = require('socket.io')(server);

// Static files
app.use('/', express.static('public'));

let vr;
const serverCallback = () => {

  console.log(`App listening on port ${port}!`);

  require('./public/js/lib/get-ip-addresses.js')().then(ipAdresses => {

    if(ipAdresses.en0) {
      ipAddress = ipAdresses.en0;
    }

  });

}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

io.on('connection', socket => {
  console.log(`Client connected ${socket.id}`);

  socket.on(`swimToServer`, data => {
    console.log(data);
    io.sockets.emit(`swimToClient`, data);
  });

  socket.emit('ipAddress', ipAddress);

});

server.listen(port, serverCallback);
