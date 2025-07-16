const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // checks JWT
const isAdmin = require('../middleware/adminMiddleware');   // checks if user is admin

const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const router = express.Router();

router.get('/orders', protect, isAdmin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders); // returns full list of orders with user name & email
});



router.get('/orders/user/:userId', protect, isAdmin, async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('orderItems.product');
  res.json(orders);
});

router.get('/stats', protect, isAdmin, async (req, res) => {
  const orders = await Order.find();

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;

  res.json({ totalRevenue, totalOrders });
});


module.exports=router;