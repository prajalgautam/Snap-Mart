import jwt from "../utils/jwt.js";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader && /^Bearer\s+\S+$/i.test(authHeader)) {
    token = authHeader.replace(/^Bearer\s+/i, "");
  } else {
    const cookie = req.headers.cookie || "";
    token = cookie.split(";").map((entry) => entry.trim())
      .find((entry) => entry.startsWith("authToken="))?.slice("authToken=".length);
  }

  if (!token) return res.status(401).send("User not authenticated.");

  try {
    const data = jwt.verifyToken(token);

    if (!data?._id || !Array.isArray(data.roles)) throw new Error("Invalid token payload.");
    req.user = data;

    next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
};

export default auth;
