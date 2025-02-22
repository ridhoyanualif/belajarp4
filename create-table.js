const db = require("./config");

const sql = `create TABLE materi (
id int not null AUTO_INCREMENT,
judul VARCHAR(255),
narsum VARCHAR(255),
isi VARCHAR(255),
primary key (id)
)`;

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("table created");
})