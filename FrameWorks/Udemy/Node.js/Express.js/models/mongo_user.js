import { getDb } from "../util/mongodb.js";
import { randomUUID } from "crypto";

class User {
  constructor(id, username, email, cart) {
    this.id = id ? id : randomUUID();
    this.name = username;
    this.email = email;
    this.cart = cart ? cart : { items: [] };
  }

  // Save or update a user (with upsert option)
  save() {
    const _db = getDb();
    const collection = _db.collection("users");

    return collection
      .updateOne({ id: this.id }, { $set: this }, { upsert: true })
      .then((result) => {
        if (result.upsertedCount > 0) {
          console.log(`User ${this.name} was inserted with ID ${this.id}`);
        } else if (result.modifiedCount > 0) {
          console.log(`User ${this.name} with ID ${this.id} was updated`);
        } else {
          console.log(`No changes made for User ${this.name}`);
        }
        return result;
      })
      .catch((err) => {
        console.error(`Failed to save user ${this.name}:`, err);
        throw err;
      });
  }

  addToCart(product) {
    const productIndex = this.cart.items.findIndex(
      (p) => p.productId === product.id
    );

    // Create a copy of the current cart items
    let updatedCartItems = [...this.cart.items];

    if (productIndex >= 0) {
      updatedCartItems[productIndex].quantity += 1;
    } else {
      updatedCartItems.push({ productId: product.id, quantity: 1 });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const _db = getDb();
    const collection = _db.collection("users");

    return collection.updateOne(
      { id: this.id },
      { $set: { cart: updatedCart } }
    );
  }

  // Get user's cart
  getCart() {
    const _db = getDb();
    const collection = _db.collection("products");

    const productIds = this.cart.items.map((p) => {
      return p.productId;
    });

    return collection
      .find({ id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId === p.id;
            }).quantity,
          };
        });
      });
  }

  deleteProductFromCart(productId) {
    const _db = getDb();
    const collection = _db.collection("users");

    // Filter out the product that matches the productId from the cart
    const updatedCartItems = this.cart.items.filter(
      (p) => p.productId !== productId
    );

    // Update the user's cart with the new items array (without the deleted product)
    return collection.updateOne(
      { id: this.id },
      { $set: { "cart.items": updatedCartItems } }
    );
  }

  // Find user by email
  static findByEmail(userEmail) {
    const _db = getDb();
    const collection = _db.collection("users");

    return collection
      .findOne({ email: userEmail })
      .then((user) => {
        if (user) {
          console.log(`User with email ${userEmail} found`);
          return user;
        } else {
          console.log(`No user found with email ${userEmail}`);
          return null;
        }
      })
      .catch((err) => {
        console.error(`Error finding user by email ${userEmail}:`, err);
        throw err;
      });
  }

  // Add an order
  addOrder() {
    const _db = getDb();

    return _db
      .collection("products")
      .find({ id: { $in: this.cart.items.map((item) => item.productId) } })
      .toArray()
      .then((products) => {
        const order = {
          user: {
            id: this.id,
            name: this.name,
            email: this.email,
          },
          items: this.cart.items.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            return {
              productId: cartItem.productId,
              title: product ? product.title : "Unknown product",
              quantity: cartItem.quantity,
            };
          }),
          date: new Date(),
        };

        // Save the order to the database
        return _db.collection("orders").insertOne(order);
      })
      .then(() => {
        // Reset the user's cart after order is saved
        return _db
          .collection("users")
          .updateOne({ id: this.id }, { $set: { cart: { items: [] } } });
      })
      .then(() => {
        console.log("Order saved and cart reset successfully!");
      })
      .catch((err) => {
        console.error("Error processing order:", err);
      });
  }

  // Get an order
  getAllOrders() {
    const _db = getDb();
    const collection = _db.collection("orders");

    return collection.find().toArray();
  }
}

export default User;
