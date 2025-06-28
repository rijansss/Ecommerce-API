  const mongoose = require('mongoose');
  
  const connectDB = async ()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URI );
      console.log("connection to MongoDB successful!")
    } catch (error) {
      console.log("Error while connecting to the database: ", error);
      process.exit(1);
    }
  }
  module.exports = connectDB;