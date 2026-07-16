import mongoose from "mongoose";
import config from "./config.js";

function connectDB() {
  if (!config.mongodbUrl) {
    console.log("MongoDB URL not provided — skipping database connection.");
    return;
  }

  mongoose
    .connect(config.mongodbUrl)
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default connectDB;
