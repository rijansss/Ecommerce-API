const getAllProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;


  const total=await Product.countDocuments({...keyword});
  const products=await Product.find({...keyword}).limit(limit).skip(skip )
 res.json({
    products,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalProducts: total
  });
};