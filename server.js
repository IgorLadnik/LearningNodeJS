'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);

let fs = require('fs');

const fileName = 'schema.json'; 

// Simple callback ======================================

fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.log(" Error happens .");
    }
    else {
        console.log(`fs.readFile(...):\n${data}`);
    }
});

// Events ================================================

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('read_file', fileName => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) 
            console.log(`Error happens. ${err}`);
        else
            console.log(`emitter:\n${data}`);
    });
});

emitter.emit('read_file', fileName);

// Promice function ==========================================

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

// Promice - then ==========================================

readFile(fileName).then((data) => {
    // success scenario
    console.log(`readFile(...).then:\n${data}`);
}).catch(err => {
    // error case scenario
    console.log(`Error happens. ${err}`);
});

// Promice - Async - Await - 1 ==============================

(async function test1() {
    try {
        let data = await readFile(fileName);
        console.log(`test1():\n${data}`);
    }
    catch (e) {
        console.log(e);
    }
})();

// Promice - Async - Await - 2 ==============================

async function test2() {
    try {
        let data = await readFile(fileName);
        console.log(`test2():\n${data}`);
    }
    catch (e) {
        console.log(e);
    }
}

let promise2 = test2();

(async function fulfill2() {
    await promise2;
})();
    

