const {loggedUsers, jwt, blacklistedtoken}  = require("../Controller/MainController")
const checkauth =(request, response, next)=>{
 const token =   request.headers.authorization
  const arrtoken = token.split(" ");
 try {


    if(token && arrtoken[0] == "Bearer"){

        jwt.verify(arrtoken[1], 'OSEOKPEKU', (err, decoded) => {
            if (err) {
              return response.status(401).json({ message: 'Invalid token' });
            }

            if(blacklistedtoken.has(arrtoken[1])){
              return response.status(401).json({ message: 'Authentication failed please login' });
            }

            request.user = decoded 
            next();
        })
    }
 } catch (error) {
    response.status(403).json({ message: 'Authentication failed.' });
 }
}

module.exports = {checkauth}