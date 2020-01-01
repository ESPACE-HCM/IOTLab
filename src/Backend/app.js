var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
function eSpaceMiddleware(request, response, next) {
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
 
app.listen(2382);