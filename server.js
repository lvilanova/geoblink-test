var http = require('http');
var states = require('./states.js');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type'});
    res.end(JSON.stringify(states));
}).listen(3000);


