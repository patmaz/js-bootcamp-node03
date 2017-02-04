document.addEventListener('DOMContentLoaded', function(){
    var dropZone = document.querySelector('#drop-zone'),
        dropZoneWrapper = document.querySelector('#drop-zone-wrapper'),
        dropZoneSpan = dropZoneWrapper.querySelector('.drop-zone__span');

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
});