var express = require('express');
var port = 5000;
var app = express();
app.set('view engine','jade');

app.get('/',(req,res)=>{
    res.send('Hello Express')
});

app.get('/angular',(req,res)=>{
    res.send('Hello Angular')
});

app.route('/node').get((req,res)=>{
    res.send('Hello Node')
});

app.listen(port,function(req,res){
    console.log("Server running on port 5000")
});