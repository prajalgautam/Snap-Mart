import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
  if (!config.mongodbUrl) throw new Error("MONGODB_URL is required.");

  await mongoose.connect(config.mongodbUrl);
  console.info("MongoDB connected successfully.");
}

export default connectDB;
