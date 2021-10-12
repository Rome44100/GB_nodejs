const http = require("http");
const fs = require("fs");
const path = require("path");

const pageHeader = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory manager</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
</head>
<body>
<header>
    <h1>Directory manager</h1>
</header>
<main>
    <div id="listing">`;
const pageFooter = `</div>
</main>
</body>
</html>`;
let pageContent = ``;

const isFile = (path) => fs.lstatSync(path).isFile();

const server = http.createServer((query, res) => {
    if (query.url === "/favicon.ico") {
        res.writeHead(200, {
            "Content-Type": "image/x-icon",
            "Cache-Control": "max-age=31536000",
        });
        res.end();
        return;
    }
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    let somePath = query.url !== "" ? query.url : "";
    const fullPath = path.join(process.cwd(), somePath);
    
    if(isFile(fullPath)) {
        pageContent = fs.readFileSync(fullPath, "utf-8");
    } else {
        const list = fs.readdirSync(fullPath);
        let prep = query.url;
        let up = "";

        if (prep.length > 1) {
            prep += "/";
            const backUrl = "/" + prep.split("/").slice(1, -2).join("/");
            up = `<li><a href="${backUrl}">..</a></li>`;
        }

        pageContent = `<ul>${up}`;
        for (let i = 0; i < list.length; i++) {
            pageContent += `<li><a href="${prep}${list[i]}">${list[i]}</a></li>`;
        }
        pageContent += "</ul>";
    }

    res.end(pageHeader + pageContent + pageFooter);
}).listen(3333);