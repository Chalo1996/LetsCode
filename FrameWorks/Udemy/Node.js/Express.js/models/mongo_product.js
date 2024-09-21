import { randomUUID } from "crypto";
import { getDb } from "../util/mongodb.js";

class Product {
  constructor(id, title, price, imageUrl, description, userId) {
    this.id = id ? id : randomUUID();
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
  }

  // Save the product to the database
  save() {
    const _db = getDb();
    const collection = _db.collection("products"); // Use the 'products' collection

    return collection
      .updateOne(
        { id: this.id }, // Filter by product ID (upsert operation)
        { $set: this }, // Update the fields with current product data
        { upsert: true } // Insert if not found (upsert)
      )
      .then((result) => {
        console.log("Product saved/updated:", result);
        return result;
      })
      .catch((err) => {
        console.error("Failed to save product:", err);
        throw err;
      });
  }

  // Fetch all products
  static fetchAll() {
    const _db = getDb();
    return _db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("Fetched products:", products);
        return products;
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        throw err;
      });
  }

  // Find a product by its ID
  static findById(productId) {
    const _db = getDb();
    return _db
      .collection("products")
      .findOne({ id: productId })
      .then((product) => {
        console.log("Product found:", product);
        return product;
      })
      .catch((err) => {
        console.error("Failed to find product:", err);
        throw err;
      });
  }

  // Delete a product by id
  static deleteProduct(productId) {
    const _db = getDb();

    return _db
      .collection("products")
      .deleteOne({ id: productId })
      .then((result) => {
        if (result.deletedCount === 0) {
          console.log(`No product found with id ${productId}`);
        } else {
          console.log(`Deleted product with id ${productId}`);
        }
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        throw new Error(err);
      });
  }
}

export default Product;
