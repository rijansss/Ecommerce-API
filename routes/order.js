const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');

const router = express.Router();

//Placing Order 
router.post('/',protect,(req,res)=>{

})