var http = require('http');
var request = require('request');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':"text/html; charset=UTF-8"});
    request('https://www.google.com/',function(error,resonse,body){                   
    }).pipe(res)   
}).listen(7000);
console.log('Server running on port 7000');       
    
