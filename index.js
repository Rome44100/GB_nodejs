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

const userList = [];
let userLogin = null;

io.on("connection", (client) => {

    userLogin = "User_" + Math.floor(Math.random() * 1000);

    client.emit("client-login", userLogin);

    userList.push({ login: userLogin, id: client.client.id });

    client.broadcast.emit("server-response-users", userList);
    client.emit("server-response-users", userList);

    client.on("disconnect", () => {
        // console.log("User disconnected", client.client.id);
        userList.forEach((el, idx, arr) => {
            if (el.id === client.client.id) {
                arr.splice(idx, 1);
            }
        });
        client.broadcast.emit("disconnect_event", userList);
        client.emit("disconnect_event", userList);
    });

    client.on("send-message", ({ message, user }) => {
        const data = {
            message: message,
            user: user
        }
        client.broadcast.emit("server-response", data);
        client.emit("server-response", data);
    });
});