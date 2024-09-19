import express from "express";
import {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postDeleteItemFromCart,
  postOrder,
} from "../controllers/shop.js";

const Router = express.Router();

Router.get("/", getIndex);
Router.get("/products", getProducts);
Router.get("/products/:productId", getProduct);
Router.get("/cart", getCart);
Router.post("/cart", postCart);
Router.get("/checkout", getCheckout);
Router.get("/orders", getOrders);
Router.post("/create-order", postOrder);
Router.post("/cart-delete-item/:productId", postDeleteItemFromCart);

export default Router;
