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

const EventEmitter = require("events");

function TimeInterval(param) {
    const args = param;
    const id = setInterval(() => {
        console.clear();
        console.log("Remaind =", param--);
        if(param == 95) {
            console.clear();
            console.log("Remaind =", param);
            console.log("End timer! Goodbye!");
            clearInterval(id);
        }
    }, 1000);
}

const run = async (param) => {
    // emitter.emit("tickjj", "remaind"); // ???????
    await new Promise(resolve => {
        TimeInterval(param);
    });
    await run(param);
}

function tick(payload) {
    console.log("Remaind =", payload);
}

const emitter = new EventEmitter();

emitter.on("tick", tick);

run(100);