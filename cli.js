const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const list = fs.readdirSync(__dirname);
// const list = fs.readdirSync(__dirname).filter(isFile);

inquirer.prompt([
    {
        name: "fileName",
        type: "list", // input, number, confirm, checkbox, password
        message: "Choose directory",
        choices: list,
    }
]).then(answer => {
    console.log(answer);
});