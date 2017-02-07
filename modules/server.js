var http = require('http');
var colors = require('colors');
var server = http.createServer();
var routes = require('./routes');
var url = require("url");
var wsServer = require('./wsServer');

function start() {
    function onRequest(req, res){
        console.log('GOT REQUEST'.yellow);

        var route = url.parse(req.url).pathname;

        (function(route, req, res){
            if (route === '/') {
                route = 'start';
            } else {
                route = route.substring(1);
            }

            try {
                routes[route](req, res);
            } catch (err) {
                routes.error(req, res);
            }
        })(route, req, res);
    }

    server.on('request', onRequest)
        .listen(9000);
    console.log('Server serves :)'.green);
}

wsServer.websocket(server);

module.exports = {
    start: start,
}