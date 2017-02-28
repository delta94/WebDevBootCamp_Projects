var express = require("express");
var app = express(); 
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name: "Granite Hill", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg"},
        {name: "Mountain Duck", image: "https://farm9.staticflickr.com/8039/7930464504_d02f777308.jpg"}
    ]

// Routes
// landing page
app.get("/", function(req, res) {
    res.render("landing");
});

//show all campground details
app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds:campgrounds});
});

// create a new campground using the form
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image= req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

// shows the form and send the data to the post route
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

/*If a user visits any other route, print:
"Sorry, page not found...What are you doing with your life?"
*/
app.get("*", function(req, res){
   res.send("Sorry, page not found...What are you doing with your life?");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log("Starting the YelpCamp Server on port 3000");
});