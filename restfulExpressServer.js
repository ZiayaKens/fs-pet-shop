const express = require("express");
const app = express();
var parser = require("body-parser");

const restful = require("./expressServer.js");

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.use(restful);
app.listen("3000", function (req, res){
  console.log("listening on port 3000");
});

module.exports = app
