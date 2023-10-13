const { response } = require("express");
const Auth_signup = require("../Model/Sign_up")
const {validationResult} = require("express-validator")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const loggedUsers = new Set();
// https://github.com/daroOkpeku/food-rev-api/blob/master/src/controllers/UserController.js
const Register = async(request, response)=>{
   const error = validationResult(request);
   console.log(error);
   if(!error.isEmpty()){
     response.json([{message:error}]);   
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

const createJwttoken = (user)=>{
    
  const token = jwt.sign(user.toJSON(), 'OSEOKPEKU', { expiresIn: 172800 });
  return token;
}

const Login  = async(request, response)=>{
   const error = validationResult(request);
   if(!error.isEmpty()){
      response.json([{message:error}]);   
   }else{
      const findrow = await Auth_signup.findOne({
         where: { email: request.body.email },
       });
     const comparepass =   await bcrypt.compare(request.body.password, findrow.password);
        if(findrow && comparepass){  
         const token =  createJwttoken(findrow);
         loggedUsers.add(findrow.id)
         let user = {id:findrow.id, fullname:findrow.fullname, email:findrow.email}
         let data = {
            user:user,
            token:token
         }
          response.json(data);
        }
   }
}


module.exports = {Register, Login, loggedUsers, jwt}