// function parse logs
async function createFileByNameAndPutStuff (findStr = "my", pathToFile) {
    const fs = require("fs");
    const readline = require("readline");
    const fullPath = "../../Lesson_3_filesystem/logs/" + findStr + "_requests.log";

    const readStream = fs.createReadStream(pathToFile, { flags: "r", encoding: "utf-8" });

    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    const writeStream = fs.createWriteStream(fullPath, { flags: "a" });

    for await (const line of rl) {
        if(-1 != line.indexOf(findStr)) {
            writeStream.write(line + "\n");
        }
    }

    writeStream.on("finish", () => console.log("Finished writing file!"));
    writeStream.on("error", (er) => console.log("Error write line!", er));

    readStream.on("end", () => console.log("End read file!"));
    readStream.on("error", (er) => console.log("Error read file!", er));
}

// createFileByNameAndPutStuff("89.123.1.41", "../../Lesson_3_filesystem/access.log"); // too big ~ 500 MB
createFileByNameAndPutStuff("34.48.240.111", "../../Lesson_3_filesystem/access.log"); // some smaller ~ 39 MB