const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User= require('../models/User');
const user = require('../models/User');

const router=express.Router();

router.post('/register',async(req,res)=>{
 //check if user exists
try{
   const{name,email,password}=req.body;
     const userExists=await User.findOne({email});
     if(userExists)
      return (res.status(400).json({message:'User already Exists'}));

     const hashedPassword= await bcrypt.hash(password,10)

     //save user
     const user= await User.create({
      name,
      email,
      password:hashedPassword
     })
     
     res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id),
     })
  

}catch(error){
     res.status(500).json({ message: 'Server error', error: err.message });
}
})
router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body;

    //checking user 
    const user =await User.findOne({email})
    if(!user)
      return res.status(400).json({message:'invalid email or password'})
    
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch)
      return res.status(400).json({message:'invalid password  '})

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

  }catch(error){
  console.log("Error while login",error)
  }
})

// Generate JWT
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

module.exports = router;