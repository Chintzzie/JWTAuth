var jwt = require('jsonwebtoken');
var config=require("../config");
// all the middleare goes here
var middlewareObj = {};

middlewareObj.validate=function(req,res,next){
  var token=req.headers['cookie'];
  token=token.slice(36);
  if (!token){
    res.redirect("/login");
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      res.redirect("/login");
    }
    req.id=decoded.id;
    next();
 
  });
}

module.exports = middlewareObj;