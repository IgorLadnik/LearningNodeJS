'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);


let fs = require('fs');

//// Promise
//var q = require('q');

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}

(async function test() {
    try {
        let data = await readFile('schema.json');
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }
}) ();

//readFile('schema.json').then((data) => {
//    // success scenario
//    console.log(data);
//}).catch((err) => {
//    // error case scenario
//    console.log(' Error happens .' + err);
//});

// Simple callback
fs.readFile('schema.json', 'utf8', (err, data) => {
    if (err) {
        console.log(" Error happens .");
    }
    else {
        console.log(data);
    }
});

// Events
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('read_file', fileName => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(" Error happens .");
        }
        else {
            console.log(data);
        }
    });
});

emitter.emit('read_file', 'schema.json');

