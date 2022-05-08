const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

var blogs=[];
var title="";
var blog="";

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true});

const BlogSchema = new mongoose.Schema({        // blog Schema
    title:String,
    content:String
});

const blogs_model = mongoose.model("Blog",BlogSchema);  // creation of model


app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs");


app.get("/",function(req,res){
    blogs=[];
    blogs_model.find({},function(err,b_list){
        if(err){
            console.log("Error Detected!");
        }
        else{
            console.log("No Errors");
        }
        for(let i=0;i<b_list.length;i++){
            blogs.push([b_list[i].title,b_list[i].content]);
        }
        res.render("blog",{bb:blogs});
    });
    
    
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

    //database member creation
    const object = new blogs_model({
        title: req.body.inp,
        content:req.body.tex
    });
    object.save();

    res.redirect("/");
});

app.post("/delete",function(req,res){
    let data= blogs[req.body.button];
    blogs.splice(req.body.button,1);
    blogs_model.deleteOne({title:data[0]},function(err){
        if(err){
            console.log("Error Detected!");
        }
        else{
            console.log("No Error found!");
        }
    });
    res.redirect("/");
});

app.get("/about",function(req,res){
    res.sendFile(__dirname+"/about.html");
});

app.listen(3000,function(){
    console.log("App listening on port 3000");
});