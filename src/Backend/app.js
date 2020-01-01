var express = require('express');

var app = express();

app.get('/', function(request, response){
   response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
   response.write("Welcome you to E-Space!");
   response.end();
});

app.get('/slogan', function(request, response){
   response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
   response.write("E-Space: Không gian sáng tạo");
   response.end();
});

app.listen(2383);