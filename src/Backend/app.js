var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.text())

function eSpaceMiddleware(request, response, next) {
    
    console.log("Get request");
    console.log(request.body);
    var x = parseInt(request.body.x);
    var y = parseInt(request.body.y);
    request.x = x;
    request.y = y;
    next();
}
app.use(eSpaceMiddleware);
 
app.post('/add', function(request, response){
    
    var z = request.x + request.y;
    response.send(request.x + " + " + request.y + " = " + z);
});
app.post('/subtract', function(request, response){
    var z = request.x - request.y;
    response.send(request.x + " - " + request.y + " = " + z);
});
app.post('/multiple', function(request, response){
    var z = request.x * request.y;
    response.send(request.x + " * " + request.y + " = " + z);
});
app.post('/divide', function(request, response){
    var z = request.x / request.y;
    response.send(request.x+ " / " + request.y + " = " + z);
});
 
app.get('/', function(request, response){
   response.sendFile('./views/index.html', { root: __dirname });
});

app.listen(2383);