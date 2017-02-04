document.addEventListener('DOMContentLoaded', function(){
    var dropZone = document.getElementById('drop-zone'),
        dropZoneWrapper = document.getElementById('drop-zone-wrapper'),
        dropZoneSpan = dropZoneWrapper.querySelector('.drop-zone__span'),
        sendBtn = document.getElementById('sendBtn'),
        chat = document.getElementById('chat');

    dropZone.addEventListener('dragenter', function(e){
        dropZoneWrapper.classList.add('js-cursor-is-over');
        dropZoneSpan.innerHTML = "Feed me";
    });
    dropZone.addEventListener('dragleave', function(e){
        dropZoneWrapper.classList.remove('js-cursor-is-over');
        dropZoneSpan.innerHTML = "Drag and drop your file here<br> or click to choose";
    });
    dropZone.addEventListener('drop', function(e){
        //nothig
    });
    dropZone.addEventListener('change', function(){
        dropZoneSpan.innerHTML = "Yummy!";
        dropZoneWrapper.classList.remove('js-cursor-is-over');
        dropZoneWrapper.classList.add('js-dropped');
    });

    var ws = new WebSocket('ws://localhost:9000/', 'echo-protocol');

    sendBtn.addEventListener('click', function(){
        var message = document.getElementById('msg').value;
        ws.send(message);
    });
    ws.addEventListener("message", function(e) {
    // The data is simply the message that we're sending back
        var msg = e.data;

        // Append the message
        chat.innerHTML += '<br>' + msg;
    });
});