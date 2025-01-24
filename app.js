const express = require("express");
const db = require("./config");
const path = require("path");
// const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const fs = require("fs");
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // Parses form data


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

// const data = [
//     {
//         nama: "ridho",
//         kelas: "99"
//     },
//     {
//         nama: "jovan",
//         kelas: "99"
//     }
// ]


app.get("/", (req, res) => {
    // res.sendFile("./view/index.html", { root: __dirname});
    // res.render("index", {title : 'Belajar', description: desc, data});

    const sql = `select * from materi`;
        
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.render("index", { data: "", 
            title: "Belajar aja",
            description: desc,
            data: result });
    });
});


app.get("/add-materi", (req, res) => {
    // res.sendFile("./view/about.html", { root: __dirname});
    res.render("add-materi", {title: "Add-materi"});
});

app.get("/view-materi/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT judul, narsum, isi FROM materi WHERE id = ?`;
  
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        const materi = result[0];
        res.render("view-materi", {
          title: materi.judul,
          judul: materi.judul,
          narsum: materi.narsum,
          isi: materi.isi,
        });
      } else {
        res.status(404).render("404", { title: "Materi Tidak Ditemukan" });
      }
    });
  });
  

// app.get("/contact", (req, res) => {
//     res.redirect("/about");
// });


app.get("/materi", (req, res) => {
    // res.sendFile("./view/index.html", { root: __dirname});
    // res.render("index", {title : 'Belajar', description: desc, data});

    const sql = `select * from materi`;
        
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.render("materi", { data: "", 
            title: "Materi",
            description: desc,
            data: result });
    });
});

app.get("/materi/:id", (req, res) => {
    // res.sendFile("./view/index.html", { root: __dirname});
    // res.render("index", {title : 'Belajar', description: desc, data});
    const id = req.params.id;
    const sql = `select * from materi where id = ${id}`;
        
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.render("detail-materi", { data: "", 
            title: "Detail materi",
            data: result });
    });
});

app.delete("/materi/:id", (req, res) => {
    // res.sendFile("./view/index.html", { root: __dirname});
    // res.render("index", {title : 'Belajar', description: desc, data});
    const id = req.params.id;
    
    const sql = `delete from materi where id = ?`;
        
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.send(`
                <script>
                    alert("Error menghapus materi!");
                    window.location.href = "/"; // Redirect ke halaman utama
                </script>
            `);
        } else {
            res.send(`
                <script>
                    alert("Materi berhasil dihapus!");
                    window.location.href = "/"; // Redirect ke halaman utama
                </script>
            `);
        }
    });
});

app.post('/edit-materi/:id', (req, res) => {
    const id = req.params.id;
    const { judul, narsum } = req.body;

    const sql = `UPDATE materi SET judul = ?, narsum = ? where id = ${id}`;
    db.query(sql, [judul, narsum], (err, result) => {
        if (err) {
            console.error(err);
            res.send(`
                <script>
                    alert("Error memperbarui materi!");
                    window.location.href = "/"; // Redirect ke halaman utama
                </script>
            `);
        } else {
            res.send(`
                <script>
                    alert("Materi berhasil diperbarui!");
                    window.location.href = "/"; // Redirect ke halaman utama
                </script>
            `);
        }
    });
});

app.post('/add-materi', (req, res) => {
    const { judul, narsum, isi } = req.body;

    const sql = 'INSERT INTO materi (judul, narsum, isi) VALUES (?, ?, ?)';
    db.query(sql, [judul, narsum, isi], (err, result) => {
        if (err) {
            console.error(err);
            res.send(`
                <script>
                    alert("Error menambahkan materi!");
                    window.location.href = "/"; // Redirect ke halaman utama
                </script>
            `);
        } else {
            res.send(`
                <script>
                    alert("Materi berhasil ditambahkan!");
                    window.location.href = "/"; // Redirect ke halaman utama
                </script>
            `);
        }
    });
});

app.use((req, res) => {
    // res.sendFile("./view/404.html", { root: __dirname});
    res.render("404", {title: "404"});
});