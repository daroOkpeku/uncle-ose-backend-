const { response } = require("express");
const Auth_signup = require("../Model/Sign_up")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
// https://github.com/daroOkpeku/food-rev-api/blob/master/src/controllers/UserController.js
const Register = async(request, response)=>{
   const error = validationResult(request);
   console.log(error);
   if(!error.isEmpty()){
     response.json([{message:'error'}]);   
   }else{
       if(request.body.password === request.body.confirm_pass){

        const brycrypass =  await bcrypt.hash(request.body.password, 10);
         Auth_signup.create({
            fullname:request.body.fullname,
            email:request.body.email,
            password:brycrypass
         })
         response.json([{success:'you have successfully registered'}]);
       }else{
        response.json([{error:'please enter the correct string'}]);

       }
   }
}


module.exports = {Register}