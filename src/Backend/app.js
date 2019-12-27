// Main application
var http = require('http');

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
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var data = JSON.parse(body);
        var x = data.x;
        var y = data.y;
        var z = x + y;
        response.write(x + " + " + y + " = " + z);
        response.end();
    });
}

