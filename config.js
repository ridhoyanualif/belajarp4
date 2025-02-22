const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "belajarp4",
});

con.connect(function (error){
    if (error) throw error;
    console.log("Koneksi Berhasil");
});

module.exports = con;