var WebSocketServer = require('websocket').server;

function websocket(server) {
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
        clients[id].sendUTF('Hello ' + id);

        connection.on('message', function(message) {

            var msgString = message.utf8Data;

            for(var i in clients){
                clients[i].sendUTF(id + ' : ' + msgString);
            }
        });

        connection.on('close', function(reasonCode, description) {
            delete clients[id];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    });
}

module.exports = {
    websocket: websocket
}