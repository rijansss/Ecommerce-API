# 🛍️ E-Commerce Backend API

A fully-featured E-Commerce backend built with **Node.js**, **Express**, and **MongoDB**, complete with authentication, product reviews, admin controls, payment simulation, and deployment.

> ✅ Built by Makwana Rijans 
> 📦 Frontend: Coming Soon (React)

---

## 🚀 Features

- ✅ User Authentication (JWT, Protected Routes)
- ✅ Admin Roles (Access control via middleware)
- ✅ CRUD Operations for Products, Users, and Orders
- ✅ Product Reviews & Rating System
- ✅ Wishlist Support
- ✅ Pagination, Search, and Filtering
- ✅ Order Placement + Payment Simulation
- ✅ MongoDB Atlas + Render Deployment
- ✅ Error Handling Middleware

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **ORM:** Mongoose
- **Hosting:** Render
- **API Testing:** Postman / Thunder Client

---

## 📁 Folder Structure

```bash
.
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── .env             # Not included in repo
├── .env.example     # Use this to configure your local env
├── server.js
└── README.md
# 🛍️ E-Commerce Backend API

🧪 API Endpoints
📦 Products
GET /api/products - List all products (with pagination + search)

GET /api/products/:id - Single product

POST /api/products - Add product (admin only)

PUT /api/products/:id - Update product (admin only)

DELETE /api/products/:id - Delete product (admin only)

POST /api/products/:id/review - Add a review

👤 Users
POST /api/users/register - Register

POST /api/users/login - Login

GET /api/users/profile - Get logged-in user profile

PUT /api/users/profile - Update user profile

GET /api/users/ - Admin: list all users

DELETE /api/users/:id - Admin: delete user

🛒 Orders
POST /api/orders - Place an order

GET /api/orders/my - Get my orders

GET /api/orders/:id - Order by ID

PUT /api/orders/:id/pay - Mark order as paid

💖 Wishlist
GET /api/products/wishlist - Get user wishlist

POST /api/products/:id/wishlist - Toggle wishlist

🔐 Environment Variables
Create a .env file based on .env.example:

# Clone the repo
git clone https://github.com/rijans/ecommerce-backend.git
cd ecommerce-backend

# Install dependencies
npm install


# Run server
npm start
☁️ Database hosted on MongoDB Atlas

📧 Email: makwanarijans@example.com

🧠 Future Improvements
Connect to React frontend
Add Stripe/Razorpay payment integration
Admin dashboard UI
Email notifications for order status



