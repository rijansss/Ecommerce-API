const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const isAdmin = require('../middleware/adminMiddleware');

router.post('/',protect, async(req,res)=>{
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

// Get all products

router.get('/',async (req,res)=>{
  try {
    const products=await Product.find();
    res.json(products); 
  } catch (error) {
    console.log('error fetching products:', error);
    
  }
});

//get by ID

router.get('/:id',async (req,res)=>{

  try {
      const product =await Product.findById(req.params.id);
      if(!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);

  } catch (error) {
    console.log('error fetching product:', error);
  }
})

//update a product

router.put('/:id',protect,isAdmin,async(req,res)=>{
try {
    const{name,description,price,countInStock,image}=req.body
    const product=await Product.findById(req.params.id);
    if(!product)
      return res.status(404).json({message:"product not found" })
     product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    product.image = image || product.image;

     const updated = await product.save();
     res.json(updated);

} catch (error) {
  console.log('error updating product:', error);
}
})


//Deleting a product (only admin)

router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});


module.exports = router;