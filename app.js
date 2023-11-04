const express = require("express");
const cors = require("cors");
const sequelize = require("sequelize")
const Config = require("./config");
 const {Register, Login, Logout, Chat, poststories} = require("./Controller/MainController")
const {signup_check, login_check} = require("./validation/sign_validation");
const { checkauth } = require("./Middleware/checkauth")
const app = express();

// this allow the url that can use the backend
const corsOption = {
    origin:"*",
}


app.use(cors(corsOption));
app.use(express.json());


app.use(express.urlencoded({extended:true}));

app.get("/", (request, response)=>{
  response.json({message:"hello we are here"});
})

// sign_validation
app.post('/register', signup_check, Register)
app.post('/login', login_check, Login)
app.post('/comment', Chat)
app.get('/logout', checkauth, Logout)
app.post('/stories', checkauth, poststories)
app.get('/protected', checkauth, (request,  response)=>{
  response.json({ message: `This is a protected route.` });
});



const port = process.env.PORT || 3030

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
})


