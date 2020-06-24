var express = require("express");
var app = express(); 
var port = 3000;

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var dbconn = mongodb.MongoClient.connect("mongodb://localhost:27017/student_record");
let db
var dbname = "student_record"

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    
});

app.listen(port, () => {
    console.log("server listening on port" + port);
});
app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/insert", function(req, res){
  dbconn.then(function(client){
       delete req.body._id;
       db = client.db(dbname)
       db.collection("students").insertOne(req.body);
        
   });
    res.send("Submitted:\n" + JSON.stringify(req.body));
console.log("submitted")

});
app.get("/getdata", function(req, res){
    dbconn.then(function(client){
        db = client.db(dbname)
    db.collection("students").find({}).toArray().then(function(students){
         res.status(200).json(students);
         
     });
  });
});
