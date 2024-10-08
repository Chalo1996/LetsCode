import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/user.js";

config();

export function signup(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    // Pass error to Express error-handling middleware
    return next(error);
  }

  const { email, name, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name,
        email,
        password: hashedPassword,
        posts: [],
      });

      return user.save();
    })
    .then((user) => {
      res.status(201).json({
        message: "User created successfully!",
        userId: user._id,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      // Pass error to Express error-handling middleware
      next(error);
    });
}

export function login(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "Wrong Email or Password. Please check your credentials and try again."
        );
        error.statusCode = 401;
        return next(error);
      }

      // Compare passwords
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          const error = new Error(
            "Wrong Email or Password. Please check your credentials and try again."
          );
          error.statusCode = 401;
          return next(error);
        }

        // Generate JWT token
        const token = jsonwebtoken.sign(
          { email: user.email, userId: user._id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Send response with token
        res.status(200).json({
          message: "Logged in successfully.",
          token,
          userId: user._id.toString(),
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
