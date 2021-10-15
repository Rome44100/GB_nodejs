const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((q, r) => {
    const indexPath = path.join(__dirname, "index.html");
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(r);
}).listen(3333);

const io = socket(server);

io.on("connection", (client) => {
    console.log("Connected with server!");

    client.on("send-message", data => {
        console.log(data);
    });
});