var http = require("http");

http
  .createServer(function (req, res) {
    res.write("hello web");
    res.end();
  })
  .listen(8080);
