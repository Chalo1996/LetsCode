import express from "express";
import path from "path";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { getErrorPage } from "./controllers/error.js";
import sequelize from "./util/database.js";
import Product from "./models/db_product.js";
import User from "./models/user.js";
import Cart from "./models/db_cart.js";
import CartItem from "./models/cart_item.js";
import Order from "./models/order.js";
import OrderItem from "./models/order_items.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Use express.urlencoded middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// Middleware to make the user available in all requests
app.use((req, res, next) => {
  // Find the user by email instead of by primary key
  User.findOne({ where: { email: "emusyoka759@gmail.com" } })
    .then((user) => {
      if (user) {
        // Attach the user object to the request
        req.user = user;
      } else {
        console.log("User not found");
      }
      // Continue to the next middleware or route
      next();
    })
    .catch((err) => console.error("Error fetching user:", err));
});

// Use the admin and shop routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use(getErrorPage);

// Define relationships
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

Cart.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

Order.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

User.hasMany(Product);
User.hasMany(Order);
User.hasOne(Cart);

// Sync database and create the default user
sequelize
  .sync()
  .then(() => {
    return User.findOrCreate({
      where: { email: "emusyoka759@gmail.com" },
      defaults: { name: "Emmanuel Chalo", email: "emusyoka759@gmail.com" },
    });
  })
  .then(async ([user, created]) => {
    if (created) {
      console.log("New user created:", user.dataValues);
    } else {
      console.log("User already exists:", user.dataValues);
    }

    // Ensure user has only one cart
    let cart = await Cart.findOne({ where: { userId: user.id } });
    if (!cart) {
      console.log("Creating a new cart for user");
      cart = await user.createCart();
    } else {
      console.log("User already has a cart");
    }

    return cart;
  })
  .then(() => {
    // Start the server after user creation and cart check
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("An error occurred syncing with the database", error);
  });
