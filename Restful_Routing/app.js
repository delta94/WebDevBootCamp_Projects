var express = require("express"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

// APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created:  {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
    title: "Test blog", 
    image: "https://s-media-cache-ak0.pinimg.com/736x/e5/55/f2/e555f2ab600e9668466cbadf000a9260.jpg",
    body: "This is a test post!"
});*/

// RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX Route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE Route
app.post("/blogs", function(req, res) {
    // create blog
      req.body.blog.body = req.sanitize(req.body.blog.body);
      Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
        } else {
            // redirect to the index page
            res.redirect("/blogs");
        }
    });
});

// SHOW Route
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   })
});

// EDIT Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
   //redirect somewhere
});


// Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log("Starting the RESTful BlogApp Server on port 3000");
});