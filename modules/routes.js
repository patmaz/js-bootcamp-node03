var colors = require('colors');
var fs = require('fs');
var formidable = require('formidable');
var url = require('url');
var path = require('path');
var ejs = require('ejs');

function start(req, res){
    console.log('Welcome request'.blue);
    try {
        fs.readFile('./templates/start.html', 'utf-8', function(err, data){
            if (err) throw err;
            var renderedHtml = ejs.render(data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(renderedHtml);
            res.end();
        });
    } catch(err) {
        console.error(err);
    }
}

function upload(req, res){
    console.log('Upload request'.blue);
    var newName;
    var form = new formidable.IncomingForm();
    form.on('field', function(field, value){
            newName = value + '.gif';
        })
        .on('fileBegin', function(name, file){
            console.log('get first chunk of data: ' + file.name);
            file.path = './uploads/' + newName;
        })
        .on('progress', function(bytesReceived, bytesExpected){
            console.log('uploading: ', (bytesReceived/bytesExpected)*100 + '%');
        })
        .on('file', function(name, file){
            console.log('file uploaded: ', file.name);
        })
        .on('end', function(){
            try {
                fs.readFile('./templates/uploaded.html', 'utf-8', function(err, data){
                    if (err) throw err;
                    var renderedHtml = ejs.render(data, {image: newName});

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(renderedHtml);
                    res.end();
                });
            } catch(err) {
                console.error(err);
            }
        });
    form.parse(req);
}

function show(req, res){
    var imgPath = './uploads/' + url.parse(req.url).query.slice(4);
    console.log('Show request: '.blue, imgPath);
    try {
        fs.readFile(imgPath, function(err, data){
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'image/gif'});
            res.write(data, 'binary');
            res.end();
        });
    } catch(err) {
        console.error(err);
    }
}

function chat(req, res){
    console.log('Chat request'.blue);
    try {
        fs.readFile('./templates/chat.html', 'utf-8', function(err, data){
            if (err) throw err;
            var renderedHtml = ejs.render(data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(renderedHtml);
            res.end();
        });
    } catch(err) {
        console.error(err);
    }
}

function js(req, res){
    var jsPath = './templates/js/' + url.parse(req.url).query.slice(5);
    console.log('JS request: '.blue, jsPath);
    try {
        fs.readFile(jsPath, 'utf-8', function(err, data){
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
            res.write(data);
            res.end();
        });
    } catch(err) {
        console.error(err);
    }
}

function css(req, res){
    var cssPath = './templates/css/' + url.parse(req.url).query.slice(5);
    console.log('CSS request: '.blue, cssPath);
    try {
        fs.readFile(cssPath, 'utf-8', function(err, data){
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
            res.write(data);
            res.end();
        });
    } catch(err) {
        console.error(err);
    }
}

function error(req, res){
    console.log('Fuckup'.red);
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Grrrr, error');
    res.end();
}

module.exports = {
    upload: upload,
    start: start,
    show: show,
    chat: chat,
    js: js,
    css: css,
    error: error
}