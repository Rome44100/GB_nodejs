const colors = require("colors/safe");

let start  = 0;
let end    = 10;
let result = [];
let simple = true;

if(process.argv[2] != undefined && process.argv[3] != undefined) {
    start = parseInt(process.argv[2], 10);
    end = parseInt(process.argv[3], 10);
    if(isNaN(start) || isNaN(end)) {
        console.log(colors.red("One of the args (or both of them) is not a digit! Exit!"));
        process.exit();
    }
} else {
    console.log(colors.red("One of the args (or both of them) is empty! Exit!"));
    process.exit();
}

if(start <= 1) start = 2;

for(let i = start; i <= end; i++) {
    for(let j = 2; j < i; j++) {
        if(i % j === 0) {
            simple = false;
        }
    }
    if(simple) {
        result.push(i);
    }
    simple = true;
}

if(result.length === 0) {
    console.log(colors.red("There are no simple digits!"));
} else {
    for(let n = 0; n < result.length; n++) {
        if(n % 3 === 0) console.log(colors.green(result[n]));
        if((n + 2) % 3 === 0) console.log(colors.yellow(result[n]));
        if((n + 1) % 3 === 0) console.log(colors.red(result[n]));
    }
}