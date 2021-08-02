const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken');
const { response } = require('express');
// validating Token
module.exports.authValidate = async(req, res, next)=>{
    let response = {}
    try{
console.log('cookies are',req.cookies);
const token = req.cookies.jwtToken
console.log('token at', token);
const isVerify  = await jwt.verify(token, process.env.SECRET_KEY);
if(isVerify){}
console.log(isVerify._id)
const user = await User.findOne({_id:isVerify._id})
console.log('getting user details at validation', user)
req.user= user;
req.token =  token
next();
}catch(error){
    response.status = 400;
    response.message = error.message
    response.body= {}
    res.status(response.status).send(response)

}
}