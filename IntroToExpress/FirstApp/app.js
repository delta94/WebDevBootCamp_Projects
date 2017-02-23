var express = require("express");
var app = express();

// "/" => "Hi There!!"

app.get("/", function(req, res){
    res.send("Hi There!");
});
// "/bye" => "Goodbye"

app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
// "/dog" => "Woof!!"

app.get("/dog", function(req, res){
    res.send("Woof!!!");
});

app.get("*", function(req, res){
    res.send("PAGE NOT FOUND!");
});


// Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log("Serving app on port 3000");
});