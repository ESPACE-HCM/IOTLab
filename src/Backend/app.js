var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var ledRequest = [];
app.get("/", function (request, response) {
    response.sendFile('views/index.html', {root: __dirname});
})

app.post("/led", function (request, response) {
    console.log(request.body.status);
    
    request.body.status.forEach(led => {
        var index = parseInt(led);
        ledRequest[index] = "on";        
    });
    if (request.body.status) {
        ledRequest = request.body.status;
    }
    else {
        ledRequest = "off";
    }
    response.send("OK");
})

app.get("/led", function (request, response) {
    response.send(ledRequest);
    ledRequest = "NoRequest";
    
})
app.listen(2382);

