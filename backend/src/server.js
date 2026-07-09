import "dotenv/config";
import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 8000;
const jwtSecret = process.env.JWT_SECRET || "snapmart-development-secret";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../data/users.json");
const allowedRoles = new Set(["customer", "vendor", "admin"]);

app.use(cors());
app.use(express.json());

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(usersFilePath), { recursive: true });
      await fs.writeFile(usersFilePath, "[]");
      return [];
    }

    throw error;
  }
}

async function writeUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function createAuthResponse(user, token) {
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

app.get("/", (req, res) => {
  res.json({
    message: "SnapMart API is running.",
  });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    const role = String(req.body.role || "customer").trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }

    if (!allowedRoles.has(role)) {
      return res.status(400).json({
        message: "Role must be customer, vendor, or admin.",
      });
    }

   const MIN_PASSWORD_LENGTH = 6;

if (password.length < MIN_PASSWORD_LENGTH) {
  return res.status(400).json({
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
  });
}

const users = await readUsers();

const existingUser = users.find(({ email: userEmail }) => {
  return userEmail === email;
});

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: randomUUID(),
      name,
      email,
      role,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    await writeUsers(users);

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "7d" },
    );

    return res.status(201).json(createAuthResponse(user, token));
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({

      message: "Unable to register user.",
    });
  }
});


app.post("/api/auth/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are needed.",
      });
    }

    const users = await readUsers();
    const user = users.find((savedUser) => savedUser.email === email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

   const isPasswordValid = await bcrypt.compare(
  password,
  user.passwordHash
);

if (isPasswordValid === false) {
  return res.status(401).json({
    message: "Invalid email or password.",
  });
}


    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "7d" },
    );

    return res.json(createAuthResponse(user, token));
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Unable to login user.",
    });
  }
});

app.listen(port, () => {
  console.log(`SnapMart API running on port ${port}`);
});
