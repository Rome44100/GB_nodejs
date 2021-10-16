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

    client.emit("client-name", () => {
        const data = [];
        data.push( { userName: "User_" + Date.now() } );
        client.broadcast.emit("server-response-users", data);
    });

    client.on("send-message", ({ message }) => {
        const data = {
            message: message
        }
        client.broadcast.emit("server-response", data);
        client.emit("server-response", data);
    });
});