const { response } = require("express");
const Auth_signup = require("../Model/Sign_up")
const {validationResult} = require("express-validator")
const Comment = require("../Model/Comment")
const pusher = require("../Pusher/Pusher")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Story = require("../Model/Stories");
const loggedUsers = new Set();
const blacklistedtoken = new Set();
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

const Logout = (request, response)=>{
  // blacklistedtoken.add(request.headers.authorization)
   //response.json({message:request.headers.authorization})
   const token = request.headers.authorization
   const arrtoken = token.split(" "); 
   try {
      if(token && arrtoken[0] == "Bearer"){
         jwt.verify(arrtoken[1], 'OSEOKPEKU', (err, decoded) => {
            if (err) {
              return response.status(401).json({ message: 'Invalid token' });
            }
              loggedUsers.delete(decoded.id)
              blacklistedtoken.add(arrtoken[1])
             return response.json({message:'you have successfully logout'})
        })
      }
    
   } catch (error) {
      
   }
}



const Chat = (request, response)=>{
   Comment.create({
      fullname:request.body.fullname,
      email:request.body.email,
      comments:request.body.comments,
      userId:request.body.id,
   })
   pusher.trigger('chat', 'comment', {
      message:request.body
   })
   response.json([{success:"you have successfully commented"}]);
  // console.log(request.body)

}
const poststories = (request, response)=>{
  try {
   if(request.user.id == 1 && request.user.email == 'stephen@gmail.com'){
      Story.create({
         title:"",
         bodyone:"",
         bodytwo:"",
         quotation:"",
         references:"",
         UserId:"",
         status:1
      })
      response.json([{success:"you have created a story"}]);
   }
  } catch (error) {
   response.json([{success:"you are not Authorizated to use the api"}]);
  }
}

const allstories = async(request, response)=>{
// /stories?page=1&perPage=10
   try {
      const pageNumber = parseInt(request.query.page) || 1;
      const itemsPerPage =  10;

      const offset = (pageNumber - 1) * itemsPerPage;

      let stories = await Story.findAll({
         offset,
         limit:itemsPerPage
      });
        response.json({success:stories})
   } catch (error) {
        response.json({error:'there is an error'})
   }

}

module.exports = {Register, Login, loggedUsers, jwt, Logout, blacklistedtoken, Chat, poststories, allstories}