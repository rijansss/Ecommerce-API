const mongoose=require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
      {
        product:{
          type:mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity:Number
      }
    ],
    totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Shipped', 'Delivered']
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
