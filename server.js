const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log("server berhasil dibuat");
//   res.setHeader("Content-Type", "text/html");
  // res.write("<h1>hello world</h1>");
  // fs.readFile("docs/www.txt", (err,data) => {
  //     if (err) {
  //         res.write("<p>" + (err) + "</p>")
  //     } else{
  //         res.write("<p>" + data.toString() + "</p>")
  //     }
  // });


  let path = "view/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/contact":
      path += "contact.html";
      res.statusCode = 301;
    //   res.setHeader("location", "/");
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }


  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});



server.listen(8000, "localhost", () => {
  console.log("listen to localhost 8000");
});
