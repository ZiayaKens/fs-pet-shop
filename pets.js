var pets = require('./pets.json')
const fs = require('fs');
// console.log(pets.2);
// for (keys in pets){
//   console.log("keys", keys);
// }
// console.log(pets);
// if(process.argv.length <2){
//   console.log("no");
//   process.error("didly");
// }
// if(!process.argv[2]){
//   console.error('Usage: node pets.js [read | create | update | destroy]');
//   process.exit(1);
// }

switch(process.argv[2]){
  case "read":
    fs.readFile('./pets.json', 'utf8', function(err, res){
        if(!process.argv[3]){
          if(err){
            console.error(err);
          }
          else {
            console.log(pets);
          }
        }
        else {
          if(process.argv[3] >= 0 && process.argv[3] < pets.length){
            console.log(pets[process.argv[3]]);
          }
          else{
            console.error(err);
          }
        }
    });
    break;
    case "create":

    fs.readFile('./pets.json', function(err, res){
      if(!process.argv[5]){
        console.error('Usage: node pets.js create AGE KIND NAME');
          process.exit(1);
      }
      var file = JSON.parse(res)
      var pets = {
        "age": Number(process.argv[3]),
        "kind": process.argv[4],
        "name": process.argv[5]
      };
      file.push(pets);
      file = JSON.stringify(file)
      // console.log(JSON.parse(res).push(pets))
      fs.writeFile('./pets.json', file, (err)=> {
        if (err) {
          console.error('Usage: node pets.js create AGE KIND NAME');
            process.exit(1);
        };
        console.log(pets)
      })
    });
    break;
    case "update":

    break;
    case "destroy":

    break;
    default:
      console.error('Usage: node pets.js [read | create | update | destroy]');
      process.exit(1);
    break;
}
    //
    // else if(process.argv[3] >= 0 && process.argv[3] < pets.length){
    //   console.log(process.argv);
    //   console.log(pets[process.argv[3]]);
    // }
    // // else{
    // //
    // // }
    // break;
    // case "create":
    //   if(process.argv.length == 6){
    //     let newpet = {
    //       'age': '',
    //       'kind': '',
    //       'name': '',
    //     }
    //     newpet.age = process.argv[3]
    //     newpet.kind = process.argv[4]
    //     newpet.name = process.argv[5]
    //     pets.push(newpet);
    //     console.log(pets);
    //   }
    //   else{
    //     process.exit(9);
    //   }

    // default:
    // console.log('yeayea');
    //   // console.error('Usage: node pets.js [read | create | update | destroy]');
    //   // process.exit(1);
    //   break;
