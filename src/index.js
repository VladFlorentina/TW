const express = require("express");
const app = express();

//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src/public"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/ping", (req, res) => {
  res.send("pong");
  3;
});

app.listen(8080);
