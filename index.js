const http = require("http");

const server = http.createServer((request, response) => {
    // console.log("URL", request.url);
    // console.log("method", request.method);
    // console.log("headers", request.headers);

    response.writeHead(200, "Ok", {
        "custom-header": "test"
    });

    response.end();
});

server.listen(3333);