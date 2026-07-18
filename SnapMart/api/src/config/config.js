import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!isProduction && allowedOrigins.length === 0) {
  allowedOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
}

const config = {
  appUrl: process.env.APP_URL || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET || "",
  mongodbUrl: process.env.MONGODB_URL || "",
  port: parseInt(process.env.PORT, 10) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction,
  corsAllowedOrigins: allowedOrigins,
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
  geminiModel: process.env.GEMINI_MODEL || "gemini-3.5-flash",
};

export default config;
