import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createToken = (data) => {
  if (!config.jwtSecret) throw new Error("JWT_SECRET is required.");
  const token = jwt.sign(data, config.jwtSecret, {
    expiresIn: "30d",
  });

  return token;
};

const verifyToken = (token) => {
  if (!config.jwtSecret) throw new Error("JWT_SECRET is required.");
  return jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] });
};

export default { createToken, verifyToken };
