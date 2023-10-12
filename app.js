const express = require("express");
const cors = require("cors");
const sequelize = require("sequelize")
const Config = require("./config");
 const {Register} = require("./Controller/MainController")
const {signup_check} = require("./validation/sign_validation");
const app = express();

// this allow the url that can use the backend
const corsOption = {
    origin:"*",
}
// Config.development
// const seq = new sequelize('uncle_ose', 'root', '', {
//     host: '127.0.0.1',
//     dialect:'mysql'
// });

//  seq.authenticate().then(res=>{
//     console.log('Database connection established successfully.');

//  }).catch(err=>{
//     console.error('Unable to connect to the database:', err);
//  })


app.use(cors(corsOption));
app.use(express.json());


app.use(express.urlencoded({extended:true}));

app.get("/", (request, response)=>{
  response.json({message:"hello we are here"});
})

// sign_validation
app.post('/register', signup_check, Register)

const port = process.env.PORT || 3030

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
})


