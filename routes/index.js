var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var middleware = require("../middleware");
var config=require("../config");
//root route
router.get("/",middleware.validate,function(req, res){
    User.findById(req.id,function(err,user){
      res.render("landing",{name: user.name});
    });
    
});

// show register form
router.get("/register", function(req, res){
   res.render("register",{name: null}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: config.expiresIn/1000
      });
      res.clearCookie('access-token'); 
      res.cookie('access-token',token,{httpOnly: true,expires: new Date(Date.now()+config.expiresIn)}); 
      res.redirect("/");
    }); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login",{name: null}); 
});

//handling login logic
router.post("/login", function(req, res){
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) 
            return res.redirect("/");
        
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.expiresIn/1000 
        });
        res.clearCookie('access-token'); 
        res.cookie('access-token',token,{httpOnly: true,expires: new Date(Date.now()+config.expiresIn)});
        res.redirect("/");
        });
});

// logout route
router.get("/logout", function(req, res){
   res.clearCookie('access-token'); 
   req.id=null;
   res.redirect("/");
});

module.exports = router;
