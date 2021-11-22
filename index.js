"use strict";

const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = "./logs.log";

const logs = fs.createReadStream(ACCESS_LOG, 'utf-8');

const rl = readline.createInterface({
    input: logs,
  });

rl.on("line", function (line) {
    
    if (line.search(`89.123.1.41`) == 0) {
    fs.writeFile('./89.123.1.41_requests.log', line + "\n", { flag: 'a' }, (err) => {if (err) console.log(err)});
    }
    else if (line.search(`34.48.240.111`) == 0) {
    fs.writeFile('./34.48.240.111_requests.log', line + "\n", { flag: 'a' }, (err) => {if (err) console.log(err)});
    };  
});



