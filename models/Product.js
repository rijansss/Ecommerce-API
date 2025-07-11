const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  countInStock: { type: Number, default: 0 },
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  } ,
  reviews:[ 
      {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      rating: Number,
      comment: String
    }
  ],

  numReviews: { type: Number, default: 0 },  //total number of reviews
      rating: { type: Number, default: 0 },
      wishlistedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });





module.exports = mongoose.model('Product', productSchema);
