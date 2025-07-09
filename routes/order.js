const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');

const router = express.Router();

//Placing Order 
router.post('/',protect,async(req,res)=>{
const user =await User.findById(req.user._id).populate('cart.product');
if(user.cart.length ===0)
   return res.status(400).json({ message: 'Cart is empty' });

const total = user.cart.reduce((sum,item)=>{
  return sum+ item.product.price*item.quantity;
},0);

 const order = await Order.create({
    user: user._id,
    orderItems: user.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })),
    totalAmount: total
  });

  // Clear user cart
  user.cart = [];
  await user.save();

  res.status(201).json({ message: 'Order placed', order });
});

//getting all orders
router.get('/myorders',protect,async(req,res)=>{
  const orders=await Order.find({user:req.user_id}).populate('orderItems.product')
  res.json(orders)
})

//getting single order
router.get('/:id', protect, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('orderItems.product');
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  res.json(order);
});

// Admin: Update status
router.put('/:id/status', protect, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = req.body.status || order.status;
  await order.save();

  res.json({ message: 'Order status updated', order });
});

module.exports = router;