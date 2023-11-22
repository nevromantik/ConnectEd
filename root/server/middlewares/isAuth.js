const { verify } = require('jsonwebtoken'); 

const isAuth = req => {
    const authorization = req.headers['authorization']; 
    if(!authorization) throw new Error("You need to login");
    const token = authorization.split(' ')[1]; 
    const { id } = verify(token, "kishan sheth super secret key");
  
    return userId;
}



module.exports = {
    isAuth
}