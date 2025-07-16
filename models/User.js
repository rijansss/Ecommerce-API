const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
 
 isAdmin: {
    type: Boolean,
    default: true ,
  },
 cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },

    quantity: {
      type: Number,
      default: 1
    }
  }
]


},

{ timestamps: true });


module.exports=mongoose.model("User",userSchema)
 