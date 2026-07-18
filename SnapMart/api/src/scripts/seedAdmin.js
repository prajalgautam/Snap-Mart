import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../config/config.js";
import User from "../models/User.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const adminEmail = "admin@gmail.com";
const adminPassword = "Admin@123";

async function seedAdmin() {
  if (!config.mongodbUrl) throw new Error("MONGODB_URL is required.");
  await mongoose.connect(config.mongodbUrl);
  const password = await bcrypt.hash(adminPassword, 10);

  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      $set: { name: "SnapMart Admin", password, roles: [ROLE_ADMIN], isActive: true },
      $setOnInsert: { phone: "9800000000", address: { city: "Kathmandu", province: "Bagmati", country: "Nepal" } },
    },
    { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true },
  );
  console.info(`Admin account is ready: ${adminEmail}`);
}

seedAdmin()
  .catch((error) => { console.error("Unable to seed admin:", error.message); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
