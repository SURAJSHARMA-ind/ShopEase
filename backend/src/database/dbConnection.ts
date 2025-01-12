import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    
    if (!connectionString) {
      throw new Error("MongoDB URI missing");
    }
    
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;