const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });

const createadmin = async () => {
    const existingadmin = await User.findOne({role:"admin"});
if(existingadmin){
    console.log('Admin already exists');
    return process.exit(1);
}

const handlepassword = await bcrypt.hash('sahil@123',10);
const admin = new User({
name: 'Admin',
email: 'sahilarora3481@gmail.com',
password: "sahil@123",
role: "admin",
isVerified: true,
})
await admin.save();
console.log('Admin created');
process.exit(0);
}
createadmin();
