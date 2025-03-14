// src/db.ts
import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/orion"; // Replace with your MongoDB URI if needed

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}
