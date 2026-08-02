const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to mongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
