var utils = utils || {};

(function(){
    var options = [
        '/bag/',
        '/because/',
        '/bucket/',
        '/bye/',
        '/everyone/',
        '/flying/',
        '/give/',
        '/looking/',
        '/maybe/',
        '/me/',
        '/pink/'
    ];

    function getOption(options){
        return options[Math.floor(Math.random() * ((options.length-1) + 1))];
    }

    function getPromise(target){
        var url = 'http://www.foaas.com' + getOption(options) + 'x';

        if(window.Promise){
            var promise = new Promise(function(resolve, reject){
                var req = new XMLHttpRequest();

                req.open('GET', url);

                req.onload = function(){
                    if(req.status === 200){
                        resolve(req.response);
                    } else {
                        reject(Error(request.statusText));
                    }
                }

                req.onprogress = function(){
                    console.log('loading...');
                    target.innerHTML = 'loading...';
                }

                req.onerror = function(){
                    reject(Error('Error fetching data.'));
                }

                req.setRequestHeader('Accept', 'application/json');

                req.send();
            });
            console.log('Asynchronous request made');
            console.log(promise);

            promise.then(function(data){
                console.log('Got data! Promise fulfilled');
                console.log(promise);
                target.innerHTML = JSON.parse(data).message;
            }, function(err){
                console.log('Promise rejected.');
                console.log(err.message);
            });
        } else {
            console.log('promise not available');
        }
    }

    utils.writeFck = getPromise;
})();

document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('btn'),
        msg = document.getElementById('msg');
    btn.addEventListener('click', function(){
        utils.writeFck(msg);
    });
});
