import express from "express";
import path from "path";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { getErrorPage } from "./controllers/error.js";
import { mongoConnect } from "./util/mongodb.js";
import User from "./models/mongo_user.js";

// These imports were used when working with sequelize

// import sequelize from "./util/database.js";
// import Product from "./models/db_product.js";
// import User from "./models/user.js";
// import Cart from "./models/db_cart.js";
// import CartItem from "./models/cart_item.js";
// import Order from "./models/order.js";
// import OrderItem from "./models/order_items.js";

const app = express();
const viewPath = [process.cwd(), "views"];
const staticFilesPath = [process.cwd(), "public"];
app.set("view engine", "ejs");
app.set("views", path.join(...viewPath));

// Use express.urlencoded middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(...staticFilesPath)));

// Middleware to make the user available in all requests --> When working with sequelize -> SQL: uncomment

// app.use((req, res, next) => {
//   // Find the user by email instead of by primary key
//   User.findOne({ where: { email: "emusyoka759@gmail.com" } })
//     .then((user) => {
//       if (user) {
//         // Attach the user object to the request
//         req.user = user;
//       } else {
//         console.log("User not found");
//       }
//       // Continue to the next middleware or route
//       next();
//     })
//     .catch((err) => console.error("Error fetching user:", err));
// });

// Middleware to attach user to req
app.use((req, res, next) => {
  User.findByEmail("emusyoka759@gmail.com")
    .then((user) => {
      if (user) {
        console.log("User found and set to req.user:", user);
        req.user = new User(user.id, user.name, user.email, user.cart);
      } else {
        console.log("User not found");
      }
      next();
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      next(err);
    });
});

// Use the admin and shop routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use(getErrorPage);

// Define relationships --> When working with sequelize -> SQL: uncomment
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });

// Cart.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });

// Order.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });

// Cart.belongsToMany(Product, {
//   through: CartItem,
// });
// Product.belongsToMany(Cart, {
//   through: CartItem,
// });
// Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });

// User.hasMany(Product);
// User.hasMany(Order);
// User.hasOne(Cart);

// Sync database and create the default user --> When working with sequelize -> SQL: uncomment
// sequelize
//   .sync()
//   .then(() => {
//     return User.findOrCreate({
//       where: { email: "emusyoka759@gmail.com" },
//       defaults: { name: "Emmanuel Chalo", email: "emusyoka759@gmail.com" },
//     });
//   })
//   .then(async ([user, created]) => {
//     if (created) {
//       console.log("New user created:", user.dataValues);
//     } else {
//       console.log("User already exists:", user.dataValues);
//     }

//     // Ensure user has only one cart
//     let cart = await Cart.findOne({ where: { userId: user.id } });
//     if (!cart) {
//       console.log("Creating a new cart for user");
//       cart = await user.createCart();
//     } else {
//       console.log("User already has a cart");
//     }

//     return cart;
//   })
//   .then(() => {
//     // Start the server after user creation and cart check
//     app.listen(3000, () => {
//       console.log("Server listening on port 3000");
//     });
//   })
//   .catch((error) => {
//     console.error("An error occurred syncing with the database", error);
//   });

// Start the server after connecting to MongoDB
mongoConnect()
  .then(async () => {
    // Check if user exists in MongoDB
    const userEmail = "emusyoka759@gmail.com";
    const existingUser = await User.findByEmail(userEmail);

    if (existingUser) {
      console.log("User already exists:", existingUser);
    } else {
      // Create a new user if not found
      const newUser = new User(null, "Emmanuel Chalo", userEmail);
      await newUser.save();
      console.log("New user created:", newUser);
    }

    // Start the server
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
