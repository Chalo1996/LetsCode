import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export function getProducts(req, res, next) {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        products,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getProduct(req, res, next) {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      console.log("Retrieved Product:", product);
      res.render("shop/product-details", {
        product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) =>
      console.error(`Could not find product with the ${productId} id:`, err)
    );
}

export function getIndex(req, res, next) {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getCart(req, res, next) {
  Cart.fetchAll().then((cart) => {
    res.render("shop/cart", {
      products: cart.products,
      totalPrice: cart.totalPrice,
      pageTitle: "Cart",
      path: "/cart",
    });
  });
}

export function postCart(req, res, next) {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      if (product) {
        return Cart.addProduct(product);
      } else {
        console.error("Product not found");
        res.redirect("/cart");
      }
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("Error adding product to cart:", err);
      res.redirect("/cart");
    });
}

export function postDeleteItemFromCart(req, res, next) {
  const { productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        console.error("Could not find the product in cart");
        res.redirect("/cart");
      }
      Cart.deleteProductFromCart(product.id, product.price)
        .then(() => {
          res.redirect("/cart");
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error("Error fetching product:", err));
}

export function getOrders(req, res, next) {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
}

export function getCheckout(req, res, next) {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
}
