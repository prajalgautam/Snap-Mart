import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

import express from "express";
import multer from "multer";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";
import config from "./config/config.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import pageRoute from "./routes/page.route.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";
import preventNoSqlInjection from "./middlewares/noSqlInjection.js";
import errorHandler from "./middlewares/errorHandler.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { files: 5, fileSize: 5 * 1024 * 1024 } });
const app = express();
const corsOptions = {
  origin(origin, callback) {
    if (!origin || config.corsAllowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Origin is not allowed by CORS."));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.disable("x-powered-by");
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(preventNoSqlInjection);
app.use(logger);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: "draft-8", legacyHeaders: false }), authRoute);
app.set("view engine", "hbs");

app.get("/", (req, res) => res.json({ status: "ok", version: "1.0.0" }));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/ready", (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? "ready" : "not ready" });
});
app.use("/api/products", upload.array("images", 5), productRoute);
app.use("/api/users", auth, upload.single("image"), userRoute);
app.use("/api/orders", auth, orderRoute);
app.use("/pages", pageRoute);
app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use(errorHandler);

const start = async () => {
  try {
    if (!config.jwtSecret) throw new Error("JWT_SECRET is required.");
    if (config.isProduction && config.corsAllowedOrigins.length === 0) throw new Error("CORS_ALLOWED_ORIGINS is required in production.");
    await connectDB();
    connectCloudinary();
    app.listen(config.port, () => console.info(`Server listening on port ${config.port}.`));
  } catch (error) {
    console.error("Server failed to start.", error.message);
    process.exit(1);
  }
};

start();
