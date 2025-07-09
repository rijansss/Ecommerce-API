const express = require('express');
const dotenv= require('dotenv');
const connectDB= require('./config/db');
const cors=require('cors')


dotenv.config();
connectDB();
const app=express();

//Middlewares
app.use(express.json())
app.use(cors());  

//ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products',require('./routes/product'))
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/order'));




const PORT=process.env.PORT|| 5000

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
});