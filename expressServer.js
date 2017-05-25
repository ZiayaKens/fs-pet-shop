const express = require("express")
const app = express();
const fs = require("fs");

var file = require("./pets.json")

console.log(file[0]);

app.get("/pets", function(req, res) {
  fs.readFile("./pets.json", "utf8", function (err, data){
    var dataparse = JSON.parse(data);
    res.send(dataparse);
  });
});

app.get("/pets/:id", function(req, res){
    // console.log(req.params.id);
      fs.readFile("./pets.json", "utf8", function (err, data){
        var dataparse = JSON.parse(data);
        if(req.params.id<dataparse.length && req.params.id > -1){
        dataparse = dataparse[req.params.id]
        res.send(dataparse);
        }

  else {
    console.log("Should see an error>>>>???");
    res.setHeader("Content-type", "text/plain");
    res.status(404);
    res.send("Not Found");
   }
 });


  // if(req.params.id <file.length){
  //   var petstring = JSON.stringify(file[req.params.id])
  //   res.setHeader("Content-type", "application/json")
  //   res.statusMessage= 200;
  //
  //   console.log(typeof(file));
  //   res.send(file);
  // }
  // res.statusMessage= 404;
  // res.setHeader("Content-type", "text/plain");
  // res.send("Not Found");
});

app.listen("3000", function (req, res){
  console.log("listening on port 3000");
});

module.exports = app
