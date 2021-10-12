#!/c/Program Files/nodejs/node
// C:\Program Files\nodejs\node.exe
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

function getDir(somePath = "./") {
    let fullPath = path.join(__dirname, somePath);
    // let fullPath = path.join(process.cwd(), somePath);
    const isFile = (path) => fs.lstatSync(path).isFile();

    if(isFile(fullPath)) {
        const data = fs.readFileSync(fullPath, "utf-8");
        inquirer.prompt([
            {
                name: "str", 
                type: "input", // input, number, confirm, checkbox, password
                message: "Enter find string/pattern",
                choices: data,
            }
        ]).then(answer => {
            const re = new RegExp(answer.str);
            if(re.test(data)) {
                console.log("Your query string found in file! Query =", answer.str);
            } else {
                console.log("Your query string NOT found in choosen file!");
            }
        });
    } else {
        const list = fs.readdirSync(fullPath);
        inquirer.prompt([
            {
                name: "fileName",
                type: "list", // input, number, confirm, checkbox, password
                message: "Choose directory or file",
                choices: list,
            }
        ]).then(answer => {
            fullPath = path.join(somePath, answer.fileName);
            getDir(fullPath);
        });
    }
}

getDir();