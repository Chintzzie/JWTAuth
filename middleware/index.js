var jwt = require('jsonwebtoken');
var config=require("../config");
// all the middleare goes here
var middlewareObj = {};

middlewareObj.validate=function(req,res,next){
  var token=req.headers['cookie'];
  if(token==undefined)
    res.redirect("/login");
  token=token.slice(36);
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      res.redirect("/login");
    }
    res.locals.id=decoded.id;
    next();
  });
}

middlewareObj.isLoggedIn=function(req,res,next){
  var token=req.headers['cookie'];
  if(token==undefined)
    next();
  token=token.slice(36);
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      next();
    }
    if(decoded==undefined){
      res.locals.id=null;
    }else
      res.locals.id=decoded.id;
     return res.redirect("/");
 
  });
}

module.exports = middlewareObj;