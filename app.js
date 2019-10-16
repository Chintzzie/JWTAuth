var express     = require("express");
var app         = express(),
    mongoose    = require("mongoose"),
    bodyParser=require("body-parser"),
    cookieParser = require('cookie-parser');

app.use(cookieParser());
mongoose.connect("mongodb://localhost/jwtauth");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//requiring routes
var indexRoutes    = require("./routes/index");
app.use("/", indexRoutes);

app.listen(3000, function(){
    console.log("The JWTAuth Server Has Started!");
 });
