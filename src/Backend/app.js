var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var ledRequest = ["NoRequest","NoRequest","NoRequest","NoRequest","NoRequest"];

app.get("/", function (request, response) {
    console.log("getHompage");
    response.sendFile('views/index.html', {root: __dirname});
})

app.post("/led/:name/:id", function (request, response) {    
    var id = parseInt(request.params.id) - 1; 
    var name = request.params.name
    var device = getDeviceByName(name);
    ledRequest =  device.ledRequest;
    if (request.body.status) {
        ledRequest[id] = "on"
    }
    else {
        ledRequest[id] = "off";
    }
    response.send("Led " + (id + 1) + ": " + ledRequest[id])
})

app.get("/led/:name", function (request, response) {
    var requestStatus = "";
    var device = getDeviceByName(name);
    ledRequest = device.request;
    for (const led of ledRequest) {
        if (led == "on") {
            requestStatus += "1";
        }
        else if (led == "off") {
            requestStatus += "0";
        }
        else{
            requestStatus += "-";
        }
    } 
    response.send(requestStatus);
    ledRequest = ["NoRequest", "NoRequest", "NoRequest", "NoRequest", "NoRequest"];
})

app.get("/led/:name/:id", function (request, response) {
    var id = parseInt(request.params.id) - 1;  
    response.send(ledRequest[id]);
    ledRequest[id] = "NoRequest";
})

var devices = [
    { "name": "device1", "html": "device1.html"},
    { "name": "device2", "html": "device2.html"},
]
app.get("/:name", function (request, response) {

    var name = request.params.name;  
    var device = getDeviceByName(name);
    response.sendFile('views/' + device.html, {root: __dirname});
})
app.listen(2383);

