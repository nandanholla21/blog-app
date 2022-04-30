const express = require("express");
const bodyparser = require("body-parser");
const app = express();

var blogs=[];
var title="";
var blog="";

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
let data = "Hello World";

app.get("/",function(req,res){
    res.render("blog",{bb:blogs});
});
app.get("/compose",function(req,res){
    res.sendFile(__dirname+"/compose.html");
});
app.post("/compose",function(req,res){
    res.sendFile(__dirname+"/compose.html");
});

app.post("/",function(req,res){
    title = req.body.inp;
    blog = req.body.tex;
    blogs.push([title,blog]);
    res.redirect("/");
});

app.post("/delete",function(req,res){
    blogs.splice(req.body.button,1);
    res.redirect("/");
});

app.get("/about",function(req,res){
    res.sendFile(__dirname+"/about.html");
});

app.listen(3000,function(){
    console.log("App listening on port 3000");
});