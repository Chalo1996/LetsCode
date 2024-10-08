import { Router } from "express";
import { body, check } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { signup, login } from "../controllers/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Feed API");
});

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-=])(?=.*[a-zA-Z0-9]).{5,}$/
      )
      .withMessage(
        "Password must be at least 5 characters long, contain one uppercase letter, and one special character."
      ),
    body("name").trim().not().isEmpty().withMessage("Name cannot be empty"),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject(
            "Wrong Email or Password. Please check your credentials and try again."
          );
        }
        // Compare password using bcrypt
        const isEqual = await bcrypt.compare(req.body.password, user.password);
        if (!isEqual) {
          return Promise.reject(
            "Wrong Email or Password. Please check your credentials and try again."
          );
        }
      }),
  ],
  login
);

export default router;
