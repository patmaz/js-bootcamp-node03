var http = require('http');
var colors = require('colors');
var server = http.createServer();
var routes = require('./routes');
var url = require("url");
var WebSocketServer = require('websocket').server;

function start() {
    function onRequest(req, res){
        console.log('GOT REQUEST'.yellow);

        var route = url.parse(req.url).pathname;

        switch (route) {
            case '/': // / equals start
            case '/start':
                routes.welcome(req, res);
                break;
            case '/upload':
                routes.upload(req, res);
                break;
            case '/show':
                routes.show(req, res);
                break;
            case '/js':
                routes.js(req, res);
                break;
            case '/css':
                routes.css(req, res);
                break;
            default:
                routes.error(req, res);
                break;
        }
    }

    server.on('request', onRequest)
        .listen(9000);
    console.log('Servers serves :)'.green);
}

function websocket() {
    wsServer = new WebSocketServer({
        httpServer: server
    });

    var count = 0;
    var clients = {};

    wsServer.on('request', function(req){
        var connection = req.accept('echo-protocol', req.origin);
        var id = count++;
        clients[id] = connection;
        console.log((new Date()) + ' Connection accepted [' + id + ']');

        connection.on('message', function(message) {

            var msgString = message.utf8Data;

            for(var i in clients){
                clients[i].sendUTF(msgString);
            }
        });

        connection.on('close', function(reasonCode, description) {
            delete clients[id];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    });
}

module.exports = {
    start: start,
    websocket: websocket
}