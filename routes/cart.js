const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

//adding item in cart
router.post('/add', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user._id);

  const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

  if (itemIndex > -1) {
    
    user.cart[itemIndex].quantity += quantity;
  } else {
    
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  res.json({ message: 'Cart updated', cart: user.cart });
});

// getting product from cart
router.get('/', protect , async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user.cart);
});
//removing product from cart
router.post('/remove', protect, async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(item => item.product.toString() !== productId);
  await user.save();

  res.json({ message: 'Item removed from cart', cart: user.cart });
});


module.exports = router;
