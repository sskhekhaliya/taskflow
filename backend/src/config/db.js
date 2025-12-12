// src/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // connect using only the URI (modern mongoose handles options internally)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
