const {loggedUsers, jwt}  = require("../Controller/MainController")
const checkauth =(request, response, next)=>{
 const token =   request.headers.authorization
  const arrtoken = token.split(" ");
 try {

    if(token && arrtoken[0] == "Bearer"){

        jwt.verify(arrtoken[1], 'OSEOKPEKU', (err, decoded) => {
            if (err) {
              return response.status(401).json({ message: 'Invalid token' });
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