const greet = (name,usia) => {
    console.log(`hello, ${name} usia, ${parseInt(usia) + 10}`);
};

greet("mario",12);
greet("luigi",15);

const fs = require("fs");

fs.readFile("docs/www.txt", (err,data) => {
    if (err) {
        console.log(err);
    } else{
        console.log(data.toString());
    }
    console.log("");
    console.log("last line");
});

// fs.writeFile("docs/www.txt", "Halo Semuanya", () => {
//     console.log("file sudah ditulis");
// })

if (!fs.existsSync("assets")) {
    fs.mkdir("assets", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder created");
    });
} else {
    fs.rmdir("assets", {recursive: true}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder deleted");
    });
}

console.log("");
