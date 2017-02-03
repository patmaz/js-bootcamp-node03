var colors = require('colors');
var fs = require('fs');
var formidable = require('formidable');
var url = require("url");

function welcome(req, res){
    console.log('Welcome request'.blue);
    fs.readFile('./templates/start.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(data);
        res.end();
    });
}

function upload(req, res){
    console.log('Upload request'.blue);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var fullName = fields.name + '.gif';
        fs.renameSync(files.upload.path, fullName);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('uploaded<br>');
        res.write('<img src="/show?img=' + fullName + '" />');
        res.end();
    });
}

function show(req, res){
    var imgPath = './' + url.parse(req.url).query.slice(4);
    console.log('Show request: '.blue, imgPath);
    fs.readFile(imgPath, function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'image/gif'});
        res.write(data, 'binary');
        res.end();
    });
}

function error(req, res){
    console.log('Fuckup'.red);
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Grrrr, error');
    res.end();
}

module.exports = {
    upload: upload,
    welcome: welcome,
    show: show,
    error: error
}