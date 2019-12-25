// Main application
var http = require('http');

http.createServer(function (request, response) {
    response.write("Welcome to E-Space!"); 
    console.log("response writes \"Welcome to E-Space!\"");
    response.end();
}).listen(2383); 
  
console.log("Sever is listening at port 2383");
