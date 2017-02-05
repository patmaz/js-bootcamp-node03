document.addEventListener('DOMContentLoaded', function(){
    var sendBtn = document.getElementById('sendBtn'),
        chat = document.getElementById('chat'),
        consoleDiv = document.getElementById('console'),
        ws = new WebSocket('ws://localhost:9000/', 'echo-protocol');

    ws.addEventListener('open', function(e){
        console.log(e);
    });
    sendBtn.addEventListener('click', function(){
        var message = document.getElementById('msg').value;
        ws.send(message);
        document.getElementById('msg').value = '';
    });
    ws.addEventListener('message', function(e) {
        console.log(e);
        var msg = e.data;
        chat.innerHTML += '<br>' + msg;
    });
});