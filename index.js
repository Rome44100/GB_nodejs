// EXERCISE 1

// console.log('Record 1');

// setTimeout(() => {
//   console.log('Record 2');
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//         // Ошибка: первая буква в слове console написана кириллицей
//         console.log('Record 3');
//         Promise.resolve().then(() => {
//             console.log('Record 4');
//         });
//     });
//   });       
// });

// console.log('Record 5');

// Promise.resolve()
//     .then(() => Promise.resolve()
//         .then(() => console.log('Record 6')));

// 1 5 6 2 3 4

// EXERCISE 2
const { parse } = require('date-fns');
let format = require('date-fns/format');
var isFuture = require('date-fns/isFuture');
var compareDesc = require('date-fns/compareDesc');
var formatDistanceToNowStrict = require('date-fns/formatDistanceToNowStrict');
var intervalToDuration = require('date-fns/intervalToDuration');

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {};
const emitter = new MyEmitter();

// add minute because its imposible to test
let pattern = "mm-HH-dd-MM-yyyy";
const today = new Date();
const now = format(today, pattern);
let future = today.getFullYear();

// user input validation parse date-like string
if(parse(process.argv[2], pattern, today) == "Invalid Date") {
    console.log("Enter date like", pattern);
    process.exit();
}
future = parse(process.argv[2], pattern, today);

// validate future date
if(!isFuture(future)) {
    console.log("Enter date more than now", now);
    process.exit();
}

function tick() {
    const id = setInterval(() => {
        const start = new Date();
        const compare = compareDesc(start, future);
        console.clear();
        // console.log("Remind", formatDistanceToNowStrict(future));
        console.log("Remind", intervalToDuration({ start: start, end: future }));
        if (compare != 1) {
            console.log("End timer! Goodbye!");
            clearInterval(id);
        }
    }, 1000);
}

emitter.on("tick", tick);
emitter.emit("tick");