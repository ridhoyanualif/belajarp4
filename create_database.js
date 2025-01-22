const db = require("./config");

const sql = `create DATABASE belajar`;
    
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("database created")
})