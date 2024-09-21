// import Product from "../models/db_product.js";

// export function getProducts(req, res, next) {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("shop/product-list", {
//         products,
//         pageTitle: "Products",
//         path: "/products",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// export function getProduct(req, res, next) {
//   const { productId } = req.params;
//   const { id } = req.user;
//   req.user
//     .getProducts({ where: { id: productId, userId: id } })
//     .then(([product]) => {
//       console.log("Retrieved Product:", product);
//       res.render("shop/product-details", {
//         product,
//         pageTitle: product.title,
//         path: "/products",
//       });
//     })
//     .catch((err) =>
//       console.error(`Could not find product with the ${productId} id:`, err)
//     );
// }

// export function getIndex(req, res, next) {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("shop/index", {
//         products,
//         pageTitle: "Shop",
//         path: "/",
//       });
//     })
//     .catch((err) => {
//       console.error(err.stack);
//     });
// }

// export async function getCart(req, res, next) {
//   try {
//     // Fetch the cart for the user
//     const cart = await req.user.getCart();
//     console.log("CART:", cart);

//     if (!cart) {
//       console.error("No cart found for user");
//       return res.redirect("/shop");
//     }

//     // Fetch the products associated with the cart
//     const products = await cart.getProducts();
//     console.log("PRODUCTS--->GET CART", products);

//     if (!products || products.length === 0) {
//       console.log("No products in cart");
//       return res.render("shop/cart", {
//         products: [],
//         totalPrice: 0,
//         pageTitle: "Cart",
//         path: "/cart",
//       });
//     }

//     // Map through products to extract necessary details (including the cartItem relationship)
//     const cartItems = products
//       .map((product) => {
//         const cartItem = product.CartItem;

//         // Make sure cartItem exists
//         if (!cartItem) {
//           console.error(`No cartItem found for product ${product.id}`);
//           return null;
//         }

//         return {
//           id: product.id,
//           title: product.title,
//           price: cartItem.price,
//           quantity: cartItem.quantity,
//         };
//       })
//       .filter((item) => item !== null);

//     // Calculate total price
//     const totalPrice = cartItems.reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0);

//     cart.totalPrice = totalPrice;
//     cart.save();

//     // Render the cart view with the fetched products and total price
//     res.render("shop/cart", {
//       products: cartItems,
//       totalPrice: totalPrice,
//       pageTitle: "Cart",
//       path: "/cart",
//     });
//   } catch (err) {
//     console.error("Error fetching cart:", err);
//     res.redirect("/cart");
//   }
// }

// export async function postCart(req, res, next) {
//   try {
//     const cart = await req.user.getCart();
//     console.log("User's cart:", cart);
//     const { productId } = req.body;

//     // Find the product with the associated cartItem
//     const productsInCart = await cart.getProducts({
//       where: { id: productId },
//     });

//     const product = productsInCart.length > 0 ? productsInCart[0] : null;
//     console.log("PRODUCT TO UPDATE:", product);

//     if (product) {
//       // If product already exists in the cart, update the quantity and price
//       const cartItem = product.CartItem;
//       console.log("CART<---->ITEM", cartItem);
//       if (cartItem) {
//         cartItem.quantity += 1;
//         // cartItem.price = cartItem.price * cartItem.quantity;
//         await cartItem.save(); // Save the updated cartItem
//         console.log("Product quantity updated");
//       } else {
//         console.error("CartItem not found for the product");
//       }
//     } else {
//       // If product doesn't exist in the cart, add it
//       const newProduct = await Product.findByPk(productId);
//       if (newProduct) {
//         // Add product to the cart with initial quantity and price
//         await cart.addProduct(newProduct, {
//           through: { quantity: 1, price: newProduct.price },
//         });
//         console.log("Product added to cart");
//       } else {
//         console.error("Product not found in database");
//       }
//     }

//     res.redirect("/cart");
//   } catch (err) {
//     console.error("Error adding product to cart:", err);
//     res.redirect("/cart");
//   }
// }

// export function postDeleteItemFromCart(req, res, next) {
//   const { productId } = req.body;

//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       if (product) {
//         return product.CartItem.destroy();
//       } else {
//         console.error("Product not found in cart");
//       }
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.error("Error removing product from cart:", err));
// }

// export async function postOrder(req, res, next) {
//   const cart = await req.user.getCart();
//   const products = await cart.getProducts();

//   req.user
//     .createOrder()
//     .then((order) => {
//       return order.addProduct(
//         products.map((product) => {
//           product.OrderItem = { quantity: product.CartItem.quantity };

//           return product;
//         })
//       );
//     })
//     .then(() => {
//       return cart.setProducts(null);
//     })
//     .then(() => res.redirect("/orders"))
//     .catch((err) => console.error("Could not create an order", err));
// }

// export async function getOrders(req, res, next) {
//   const orders = await req.user.getOrders({ include: ["Products"] });
//   console.log("<<<--->>> ORDERS", orders);
//   res.render("shop/orders", {
//     orders,
//     pageTitle: "Orders",
//     path: "/orders",
//   });
// }

// export async function getCheckout(req, res, next) {
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//   });
// }

import Product from "../models/mongo_product.js";

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
      console.error(err.stack);
    });
}

export async function getCart(req, res, next) {
  try {
    const { user } = req;

    user.getCart().then((products) => {
      const totalPrice = products.reduce((total, product) => {
        return total + parseFloat(product.price) * product.quantity;
      }, 0);
      res.render("shop/cart", {
        products,
        totalPrice,
        pageTitle: "Cart",
        path: "/cart",
      });
    });

    // Render the cart view with the fetched products and total price
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.redirect("/cart");
  }
}

export async function postCart(req, res, next) {
  try {
    const { productId } = req.body;
    const { user } = req;
    const product = await Product.findById(productId);
    user.addToCart(product).then(() => {
      res.redirect("/cart");
    });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.redirect("/cart");
  }
}

export function postDeleteItemFromCart(req, res, next) {
  const { productId } = req.body;
  const { user } = req;

  user.deleteProductFromCart(productId).then(() => {
    res.redirect("/cart");
  });
}

export async function postOrder(req, res, next) {
  const { user } = req;

  user
    .addOrder()
    .then(() => res.redirect("/orders"))
    .catch((err) => console.error("Could not create an order", err));
}

export async function getOrders(req, res, next) {
  const { user } = req;

  user
    .getAllOrders()
    .then((orders) => {
      console.log("Orders", orders);
      res.render("shop/orders", {
        orders,
        pageTitle: "Orders",
        path: "/orders",
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getCheckout(req, res, next) {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
}
