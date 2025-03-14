import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/orion";

    await mongoose.connect(MONGODB_URI);
    console.log("connected to MongoDB ~");
  } catch (error) {
    console.error("ruh roh:", error);
    process.exit(1);
  }
};

export default connectDB;
