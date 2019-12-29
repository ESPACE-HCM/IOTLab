// Main application
var http = require('http');
var url = require('url');

http.createServer(function (request, response) {
    var method = request.method;
    if (method == "GET") {
        handleGETMethod(response);
    }
    else if (method == "POST") {
        handlePOSTMethod(request, response);
    }
    else{
        response.end();
    }
    
}).listen(2383); 

function handleGETMethod(response) {
    response.statusCode = 404;
    var ts = Date.now();
    var date = new Date(ts);
    response.write(date.toTimeString());
    response.end();
}

function handlePOSTMethod(request, response) {
    var body = "";
    var address = url.parse(request.url, true);
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var data = JSON.parse(body);
        var x = data.x;
        var y = data.y;
        if (address.path == "/add") {
            var z = x + y;
            response.write(x + " + " + y + " = " + z);
        }
        else if (address.path == "/subtract") {
            var z = x - y;
            response.write(x + " - " + y + " = " + z);
        }
        else if (address.path == "/multiple") {
            var z = x * y;
            response.write(x + " * " + y + " = " + z);
        }
        else if (address.path == "/devide") {
            var z = x / y;
            response.write(x + " / " + y + " = " + z);
        }
        else{
            response.statusCode = 404;
            response.write(address.path);
            console.log(data);
        }
        response.end();
    });
}

