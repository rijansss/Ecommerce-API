const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const User = require("../models/User");
const Order = require("../models/Order");
const router = express.Router();

//Placing Order
router.post("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  if (user.cart.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const total = user.cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await Order.create({
    user: user._id,
    orderItems: user.cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalAmount: total,
  });

  // Clear user cart
  user.cart = [];
  await user.save();

  res.status(201).json({ message: "Order placed", order });

  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      // check stock before reducing
      if (product.countInStock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }

      product.countInStock -= item.quantity;
      await product.save();
    }
  }
});
router.put("/:id/pay", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json({ message: "Payment successful", order: updatedOrder });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//getting all orders
router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user_id }).populate(
    "orderItems.product"
  );
  res.json(orders);
});

//getting single order
router.get("/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "orderItems.product"
  );
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized" });
  }

  res.json(order);
});

// Admin: Update status
router.put("/:id/status", protect, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status || order.status;
  await order.save();

  res.json({ message: "Order status updated", order });
});

module.exports = router;
