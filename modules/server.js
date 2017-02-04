var http = require('http');
var colors = require('colors');
var server = http.createServer();
var routes = require('./routes');
var url = require("url");

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
            default:
                routes.error(req, res);
                break;
        }
    }

    server.on('request', onRequest)
        .listen(9000);
    console.log('Servers serves :)'.green);
}

module.exports = {
    start: start
}