const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const SENDEmail = require('../config/nodemailer');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  
      const user = new User({ name, email, password: hashedPassword, otp, otpExpires });
      await user.save();
  
      await SENDEmail(email, 'Email Verification', `Your OTP is ${otp}`);
      res.status(200).json({ message: 'Thank you for registering! Please check your email for the OTP' });
  
    } catch (error) {
      console.error('Error in signup:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
exports.verifyotp = async (req, res) => {
try{
const{email, otp} = req.body;
const user = await User.findOne({email});
if(!user || user.otp !== otp || user.otpExpires < Date()){
    return res.status(400).json({message: 'Aap ya to galat OTP daal rahe ho ya OTP ka samay khatam ho gya hai'});
}
user.isVerified=true;
user.otp=undefined
user.otpExpires=undefined;
await user.save();
await SENDEmail(email, 'Congatullations,Email Otp  Verified', 'Your email has been successfully verified',"Hii,Thank You for joining our organisation  ... You are now a verified user"); 
return res.status(200).json({message: 'Email verified successfully'});
}catch(error){
res.status(500).json({message: 'otp verisfy se pehla hi error aagya'});
}
}

// login ka controller 

exports.login = async (req, res) => {
try{
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user||!(bcrypt.compare(password, user.password))){
    return res.status(400).json({message: 'ya to password galat hai ya email'});
}
if(!user.isVerified){
    return res.status(403).json({message: 'first verify your email'});
}
const token = jwt.sign({id: user._id,role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
return res.status(200).json({message: 'login success ho gaya ', token}); 

}catch(error){
return res.status(500).json({message: 'login karna se hi pehla error aa gaye hai '});
}
}