import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import feedRoutes from "./routes/feed.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import http from "http";
import socket from "./socket.js";
import { config } from "dotenv";

config();

import isAuth from "./middleware/isAuth.js";

const app = express();
const server = http.createServer(app);
const io = socket.init(server, { cors: { origin: "*" } });
const PORT = process.env.HTTP_SERVER_PORT || 8080;
const dbConnString = "mongodb://localhost:27017/feed";

// Multer configuration (same as your original)
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("images")) {
      fs.mkdirSync("images", { recursive: true });
    }
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// CORS and middleware setup (same as your original)
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join("images")));
app.use("/feed", isAuth, feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

// Socket event handlers
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", `Server response: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Database connection function
const dbConnection = async () => {
  try {
    await mongoose.connect(dbConnString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw new Error(err);
  }
};

// Start server after successful DB connection
dbConnection()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the server", err);
  });
