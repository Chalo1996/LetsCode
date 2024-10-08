import { validationResult } from "express-validator";
import Post from "../models/post.js";
import User from "../models/user.js";
import clearImage from "../util/clean-images.js";
import socket from "../socket.js";

// Controller for GET request
export function getPosts(req, res, next) {
  const page = +req.query.page || 1;
  const postsPerPage = 2;
  let totalItems;

  Post.countDocuments()
    .then((count) => {
      totalItems = count;

      // Fetch the posts for the requested page, skipping the previous pages' posts
      return (
        Post.find()
          .populate("creator")
          .sort({ createdAt: -1 })
          .skip((page - 1) * postsPerPage)
          // Limit the number of posts per page
          .limit(postsPerPage)
      );
    })
    .then((posts) => {
      res.status(200).json({
        message: "Fetched posts successfully.",
        posts,
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / postsPerPage),
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

// Controller for POST request
export function createPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    // Pass error to Express error-handling middleware
    return next(error);
  }

  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    return next(error);
  }

  const { title, content } = req.body;
  const imageUrl = req.file.path;
  let creator;

  const post = new Post({
    title,
    imageUrl,
    content,
    creator: req.userId,
  });

  post.save();
  User.findById(req.userId)
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((userObj) => {
      const io = socket.getIO();

      io.emit("posts", {
        action: "create",
        post: {
          ...post._doc,
          creator: { _id: req.userId, name: creator.name },
        },
      });

      res.status(201).json({
        message: "Post created successfully",
        posts: userObj.posts,
        creator: { _id: creator._id, name: creator.name },
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

export function getPost(req, res, next) {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("creator")
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post fetched.", post });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      // Pass error to Express error-handling middleware
      next(error);
    });
}

export function updatePost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    // Pass error to Express error-handling middleware
    return next(error);
  }

  const { postId } = req.params;
  const { title, content } = req.body;

  // This is the old image URL
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = req.file.path;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }

      // Check logged-in user
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized.");
        error.statusCode = 403;
        throw error;
      }

      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      const io = socket.getIO();
      io.emit("posts", { action: "update", post: result });

      res.status(200).json({ message: "Post updated!", post: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      // Pass error to Express error-handling middleware
      next(error);
    });
}

export function deletePost(req, res, next) {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }

      // Check logged-in user
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized.");
        error.statusCode = 403;
        throw error;
      }

      clearImage(post.imageUrl);
      return post.deleteOne();
    })
    .then(() => {
      return User.findById(req.userId);
    })
    .then((user) => {
      // Remove the post from the user's posts array
      user.posts.pull(postId);
      return user.save();
    })
    .then(() => {
      const io = socket.getIO();

      io.emit("deletePost", {
        action: "delete",
        postId: postId,
      });

      res.status(200).json({ message: "Deleted post." });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      // Pass error to Express error-handling middleware
      next(error);
    });
}
