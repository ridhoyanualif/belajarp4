const db = require("./config");

const sql = `create DATABASE belajarp4`;
    
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("database created")
})