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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const userList = [];
let userLogin = null;

io.on("connection", (client) => {

    userLogin = "User_" + getRandomInt(1000);

    client.emit("client-login", userLogin);

    if (!userList.includes(userLogin)) {
        userList.push(userLogin);
    }

    client.broadcast.emit("server-response-users", userList);
    client.emit("server-response-users", userList);

    client.on("send-message", ({ message }) => {
        const data = {
            message: message
        }
        client.broadcast.emit("server-response", data);
        client.emit("server-response", data);
    });
});