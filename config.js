require('dotenv').config();
module.exports={
    secret: process.env.SECRET,// put up in an environment variable
    expiresIn: 3600000 //expires every 1 hour
}