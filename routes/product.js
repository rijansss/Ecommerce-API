const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/',protect,async(req,res)=>{
  try {
   const { name, description, price, countInStock, image } = req.body;
   
    const product = await Product.create({
      name,
      description,
      price,
      countInStock,
      image,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
});

module.exports = router;