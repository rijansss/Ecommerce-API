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

//Adding product in wishlist
router.post('/:id/wishlist',protect, async(req,res)=>{
const product =await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
   if (product.wishlistedBy.includes(req.user._id)) {
    return res.status(400).json({ message: "Product already in wishlist" });
  }

  product.wishlistedBy.push(req.user._id);
  await product.save();
  res.json({ message: "Added to wishlist" });
});


//Deleting product from wishlist
router.delete('/:id/wishlist', protect, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
   await Product.updateOne(
  { _id: product._id },  // we are finding the product 
  { $pull: { wishlistedBy: req.user._id } } // we are removing the product 
    );

  res.json({ message: "Removed from wishlist" });
});

//  Leave a product review
router.post('/:id/reviews', protect, async (req, res) => {

const { rating, comment } = req.body;
const product = await Product.findById(req.params.id);

 if (!product) return res.status(404).json({ message: "Product not found" });

  // if product is already reviewed
  
  const alreadyReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({ message: "Product already reviewed" });
  }
  const review={
    user: req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
    product.reviews.push(review);
    product.numReviews = product.reviews.length;  
   product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: "Review added" });
})


//Getting Wishlist

router.get('/wishlist', protect, async (req, res) => {
  const products = await Product.find({ wishlistedBy: req.user._id });
  res.json(products);
});



module.exports = router;