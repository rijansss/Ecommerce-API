const express = require('express');
const { protect } = require('../middleware/authMiddleware'); 
const isAdmin = require('../middleware/adminMiddleware');   

const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const router = express.Router();
