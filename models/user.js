var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {type: String,unique: true},
    password: String,
    email: {type: String,unique: true}
});


module.exports = mongoose.model("User", UserSchema);