import dotenv from "dotenv";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET || "snapmart-local-dev-secret",
  mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/snapmart",
  port: process.env.PORT || 8000,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  khalti: {
    apiUrl: process.env.KHALTI_API_URL || "",
    secretKey: process.env.KHALTI_SECRET_KEY || "",
    returnUrl: process.env.KHALTI_RETURN_URL || "",
  },
  resendEmailApiKey: process.env.RESEND_EMAIL_API_KEY || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
};

export default config;
