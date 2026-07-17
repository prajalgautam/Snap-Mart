import connectDB from "./config/database.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import bcrypt from "bcrypt";

const seed = async () => {
  await connectDB();

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = (pw) => bcrypt.hashSync(pw, salt);

  // Create demo users
  const users = [
    {
      name: "Demo Customer",
      email: "demo@snapmart.com",
      phone: "9841234567",
      password: hashedPassword("Demo@123"),
      address: { city: "Kathmandu", province: "Bagmati" },
      roles: ["CUSTOMER"],
      isActive: true,
    },
    {
      name: "ABC Owner",
      email: "merchant@snapmart.com",
      phone: "9841112222",
      password: hashedPassword("Merchant@123"),
      address: { city: "Lalitpur", province: "Bagmati" },
      roles: ["MERCHANT"],
      shopName: "ABC Grocery Store",
      shopCategory: "Groceries",
      isActive: true,
    },
    {
      name: "Super Admin",
      email: "admin@snapmart.com",
      phone: "9841333444",
      password: hashedPassword("Admin@123"),
      address: { city: "Kathmandu", province: "Bagmati" },
      roles: ["ADMIN"],
      isActive: true,
    },
  ];

  for (const userData of users) {
    const existing = await User.findOne({ email: userData.email });
    if (!existing) {
      await User.create(userData);
      console.log(`Created user: ${userData.email}`);
    } else {
      console.log(`User already exists: ${userData.email}`);
    }
  }

  // Create demo products for Merchant
  const merchant = await User.findOne({ email: "merchant@snapmart.com" });
  if (merchant) {
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      const products = [
        {
          name: "Fresh Vegetables Combo Pack",
          brand: "Local Farms Nepal",
          category: "Groceries",
          price: 350,
          stock: 50,
          imageUrls: ["https://picsum.photos/seed/snapmart-veg/400/300"],
          description: "Fresh farm vegetables directly from local suppliers in Kathmandu valley. Includes seasonal greens, tomatoes, potatoes, onions, and more.",
          createdBy: merchant._id,
        },
        {
          name: "Dairy Essentials Bundle",
          brand: "Daily Fresh Dairy",
          category: "Groceries",
          price: 580,
          stock: 30,
          imageUrls: ["https://picsum.photos/seed/snapmart-dairy/400/300"],
          description: "Fresh milk, yogurt, paneer, and butter from local Nepali dairies. Delivered chilled.",
          createdBy: merchant._id,
        },
        {
          name: "iPhone 15 Pro Max",
          brand: "Apple",
          category: "Electronics",
          price: 189000,
          stock: 10,
          imageUrls: ["https://picsum.photos/seed/snapmart-iphone/400/300"],
          description: "Apple iPhone 15 Pro Max with A17 Pro chip, 48MP camera system, titanium design.",
          createdBy: merchant._id,
        },
        {
          name: "MacBook Air M3",
          brand: "Apple",
          category: "Electronics",
          price: 165000,
          stock: 8,
          imageUrls: ["https://picsum.photos/seed/snapmart-macbook/400/300"],
          description: "Apple MacBook Air with M3 chip, 15.3-inch Liquid Retina display, 18GB RAM.",
          createdBy: merchant._id,
        },
        {
          name: "Basic Medicine Kit",
          brand: "HealthPlus Nepal",
          category: "Pharmacy",
          price: 299,
          stock: 100,
          imageUrls: ["https://picsum.photos/seed/snapmart-med/400/300"],
          description: "Essential medicine kit with paracetamol, antiseptic, bandages, and common cold remedies.",
          createdBy: merchant._id,
        },
        {
          name: "Premium Notebook Set",
          brand: "StudyMate Stationery",
          category: "Stationery",
          price: 180,
          stock: 200,
          imageUrls: ["https://picsum.photos/seed/snapmart-notebook/400/300"],
          description: "Pack of 5 quality A4 notebooks with hard covers, perfect for school and office use.",
          createdBy: merchant._id,
        },
        {
          name: "Organic Rice 5kg",
          brand: "Nepal Organic",
          category: "Groceries",
          price: 650,
          stock: 40,
          imageUrls: ["https://picsum.photos/seed/snapmart-rice/400/300"],
          description: "Premium organic rice grown in the fertile fields of Jhapa, Nepal.",
          createdBy: merchant._id,
        },
        {
          name: "Samsung Galaxy S24 Ultra",
          brand: "Samsung",
          category: "Electronics",
          price: 159000,
          stock: 12,
          imageUrls: ["https://picsum.photos/seed/snapmart-samsung/400/300"],
          description: "Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera, S Pen.",
          createdBy: merchant._id,
        },
      ];

      await Product.insertMany(products);
      console.log(`Created ${products.length} demo products`);
    } else {
      console.log(`Products already exist: ${existingProducts}`);
    }
  }

  console.log("Seed completed!");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});