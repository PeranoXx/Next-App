import jwt from 'jsonwebtoken'
import findByUserId from '../helpers/findByUserId'; 

export default async(req, res, next) => {
    const bearerToken = req.headers["authorization"]; // get token from headers
    const token = bearerToken ? bearerToken.split(' ')[1] : null// split and remove bearer from token
    if (!token) {
      return res.status(403).json({message: "A token is required for authentication"});
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const checkToken = await findByUserId('tokens',decoded.id)
      console.log(checkToken);
      if(token != checkToken.token){
        return res.status(401).json({message:"Invalid Token"});
      }
      if(checkToken.is_expired == true){
        return res.status(401).json({message:"Token is expired"});
      }
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({message:"Invalid Token"});
    }
    
    return next();
  };
  
