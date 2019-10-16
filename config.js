require('dotenv').config();
module.exports={
    secret: process.env.SECRET,// put up in an environment variable
    expiresIn: 60*60 //expires every 1 hour
}