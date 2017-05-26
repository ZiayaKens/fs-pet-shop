

'use strict';

var express = require('express');
var router = express.Router();



var fs = require("fs");

router.get("/pets", function(req, res) {
  fs.readFile("./pets.json", "utf8", function (err, data){
    if(err) throw err;
    var dataparse = JSON.parse(data);
    res.send(dataparse);
  });
});


router.get("/pets/:id", function(req, res){
  fs.readFile("./pets.json", "utf8", function (err, data){
    var dataparse = JSON.parse(data);
    if(req.params.id<dataparse.length && req.params.id > -1){
      dataparse = dataparse[req.params.id]
      res.send(dataparse);
    }
    else {
      res.setHeader("Content-type", "text/plain");
      res.status(404);
      res.send("Not Found");
    }
  });
});


router.post("/pets", function(req, res) {
  for(var keys in req.body){
    if(req.body[keys] == ""){
      return res.sendStatus(400);
    }
  }

  fs.readFile("./pets.json", "utf8", (err,data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.push(req.body);
    data = JSON.stringify(data)
    fs.writeFile("./pets.json", data, (err) => {
      if(err) throw err;
    })
    res.send(req.body)
  })
});





router.patch("/pets/:id", function(req, res) {
  fs.readFile("./pets.json", "utf8", function(err, data){
    if (err) throw err;
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);
    if(id<0 || id > pets.length){
      return res.sendStatus(404);
    };
    var pet = req.body;
    if (!pet){
      return res.sendStatus(400);
    }
    for (let key in pet){
      pets[id][key] = pet[key];
    }
    var newpets = JSON.stringify(pets);
    fs.writeFile("./pets.json", newpets, function(err){
      if(err) throw err;
      res.send(pets[id])
    })
  })
});



router.delete("/pets/:id", function(req, res) {
  fs.readFile("./pets.json", "utf8", function(err, data){
    if (err) throw err;
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);
    if(id<0 || id > pets.length){
      return res.sendStatus(404);
    };
    var pet = pets.splice(id,1)[0];
    var newpets = JSON.stringify(pets);
    fs.writeFile("./pets.json", newpets, function(err){
      if (err) throw err;
      res.send(pet);
    })
  })
});
module.exports = router;
