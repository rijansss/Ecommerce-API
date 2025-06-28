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
app.use('/api/auth',require('./routes/auth'))

const PORT=process.env.PORT|| 3000

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
});