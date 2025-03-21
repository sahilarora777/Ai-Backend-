// is our user is admin or not 

exports.isAdmin = (req, res, next) => {
if(req.user.role !== 'admin'){
    return res.status(403).json({error: 'Admin resource! Access denied'});
};
next();
}


// verify token ke
const jwt = require('jsonwebtoken');

exports.authverifytoken = (req, res, next) => {
let token = req.header('authorization');
if(token && token.startsWith('Bearer ')){
    token = token.slice(7, token.length).trim();
}
    if(!token)
    return res.status(401).json({message: 'Token not found or access denied'}); 
try{
    const vrified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = vrified;
    next();
}
catch(error){
    res.status(500).json({message: 'Invalid token'});
};
}