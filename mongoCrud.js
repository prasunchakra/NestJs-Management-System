var MongoClient = require('mongodb').MongoClient;
var datetime = require('node-datetime');
var express = require('express');
var app = express();
var url = "mongodb://localhost";

app.route('/create/:id/:name').get(function (req,res) {
    MongoClient.connect(url,{useNewUrlParser: true},function (err,client) {
        if (err) {
            console.log(err);
        }
        var db = client.db('nodemongo');
        var newval = { Employeeid:Number(req.params.id), EmployeeName:req.params.name};
        db.collection('Employee').insertOne(newval, function (ferr,result) {
            if (result){
                res.send(`Account Created for : ${req.params.name}`);
            }
            else {
                res.send("Result Not Found");
            }
        });
    });
});

app.route('/read/:id').get(function (req,res) {
    MongoClient.connect(url,{useNewUrlParser: true},function (err,client) {
        if (err) {
            console.log(err);
        }
        var db = client.db('nodemongo');
        var querry = {"Employeeid":Number(req.params.id)};
        db.collection('Employee').findOne(querry,function (ferr,result)  {
            if (result){
                res.send(result);
            }
            else {
                res.send("Result Not Found");
            }
        });
    });
});

app.route('/update/:id/:name').get(function (req,res) {
    MongoClient.connect(url,{useNewUrlParser: true},function (err,client) {
        if (err) {
            console.log(err);
        }
        var db = client.db('nodemongo');
        var querry = {"Employeeid":Number(req.params.id)};
        var newval = { $set:{EmployeeName:req.params.name}};
        db.collection('Employee').updateOne(querry,newval,function (ferr,result)  {
            res.send("Successfully Updated");
        });
    });
});

app.route('/delete/:id').get(function (req,res) {
    MongoClient.connect(url,{useNewUrlParser: true},function (err,client) {
        if (err) {
            console.log(err);
        }
        var db = client.db('nodemongo');
        var querry = {"Employeeid":Number(req.params.id)};
        db.collection('Employee').deleteOne(querry,function (ferr,result)  {
            if (result){
                res.send(`Account deleted: ${req.params.id}`);
            }
            else {
                res.send("Result Not Found");
            }
        });
    });
});

app.listen(3000,function(req,res) {
    console.log("Server is running on port 3000");
});

