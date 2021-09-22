//declaration of http fileserver + port
const http = require("http")
const fs = require("fs")
const httpPort = "80"
//declaration of socket.io server + port
const ioPort = "3001"
const io = require("socket.io")(3001, {
  cors: {
    origin: '*'
  }
})

//http server (could do with further MIME-type declaration to avoid browser warnings - but this is just a skeleton not your life guide)
http.createServer((req, res) => {
  if (req.url == "/") {req.url = "/index.html"}
  req.url = `/public${req.url}`
  fs.readFile(__dirname + req.url, (err,data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(httpPort);

console.log(`HTTP server running on port ${httpPort}, socket.io running on port ${ioPort}`)

//do socket.io functions here...
io.on("connect", socket => {
  let timestamp = new Date()
  console.log(`${timestamp}: Successfully connected from ${socket}`)
  socket.emit("connected", {
    "timestamp": timestamp
  })
})