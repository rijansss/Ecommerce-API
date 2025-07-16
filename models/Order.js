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
   // Payment Related Fields
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  paymentResult: {
    id: String,        // transaction ID from Razorpay/Stripe
    status: String,    // success/failure
    update_time: String,
    email_address: String
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Shipped', 'Delivered']
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
