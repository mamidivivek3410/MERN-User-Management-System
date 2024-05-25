const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = async (req,res,next) => {
    const token = req.header('Authorization').replace('Bearer','');
    if(!token){
        res.json({message:"token not found",status:401})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            res.status(401).json({ message: 'User not found, authorization denied' });
        }
        next();
    }catch(e){
        res.json({message:e.message,status:500})
    }
}

module.exports = authMiddleware