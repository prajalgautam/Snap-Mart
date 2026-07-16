import jwt from "../utils/jwt.js";

const getCookieToken = (cookieHeader = "") => {
  const authCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("authToken="));

  return authCookie?.slice("authToken=".length);
};

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : getCookieToken(req.headers.cookie);

  if (!token) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const data = jwt.verifyToken(token);

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default auth;
