import { Router } from "express";
import { body, check } from "express-validator";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/feed.js";

const router = Router();

// Root route response (optional)
router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Feed API");
});

// Fetch posts
router.get("/posts", getPosts);
// Fetch a single post
router.get("/post/:postId", getPost);

// Create a new post with validation
router.post(
  "/post",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long."),
    body("content")
      .trim()
      .isLength({ min: 15 })
      .withMessage("Content must be at least 15 characters long."),
  ],
  createPost
);

// Update a post with validation
router.put(
  "/post/:postId",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long."),
    body("content")
      .trim()
      .isLength({ min: 15 })
      .withMessage("Content must be at least 15 characters long."),
  ],
  updatePost
);

router.delete("/post/:postId", deletePost);

export default router;
