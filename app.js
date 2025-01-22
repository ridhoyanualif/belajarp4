const express = require("express");
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const fs = require("fs");
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

let desc = "";

fs.readFile("docs/www.txt", (err,data) => {
    if (err) {
        console.error(err);
    } else{
        desc = data.toString();
    }
});

const data = [
    {
        nama: "ridho",
        kelas: "99"
    },
    {
        nama: "jovan",
        kelas: "99"
    }
]


app.get("/", (req, res) => {
    // res.sendFile("./view/index.html", { root: __dirname});
    res.render("index", {title : 'Belajar', description: desc, data});
});
app.get("/about", (req, res) => {
    // res.sendFile("./view/about.html", { root: __dirname});
    res.render("about", {title: "About"});
});
// app.get("/contact", (req, res) => {
//     res.redirect("/about");
// });
app.use((req, res) => {
    // res.sendFile("./view/404.html", { root: __dirname});
    res.render("404", {title: "404"});
});