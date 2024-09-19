import Product from "../models/db_product.js";

// Render the Add Product page
export function getAddProduct(req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
}

// Add a new product
export function postAddProduct(req, res, next) {
  const { title, imageUrl, price, description } = req.body;

  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then((result) => {
      console.log("Created a product successfully:", result.dataValues);
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.error("Error creating product:", error);
    });
}

// Render the Edit Product page
export function getEditProduct(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  req.user
    .getProducts({ where: { id: productId } })
    .then(([product]) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
      });
    })
    .catch((err) =>
      console.error("Could not find a product with the id:", err)
    );
}

// Update an existing product
export function postEditProduct(req, res, next) {
  const { productId, title, imageUrl, price, description } = req.body;
  const { id } = req.user;

  Product.update(
    {
      title,
      imageUrl,
      price,
      description,
    },
    { where: { id: productId, userId: id } }
  )
    .then(() => {
      console.log("Product updated successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Could not update the product:", err);
    });
}

// Delete a product
export function postDeleteProduct(req, res, next) {
  const { productId } = req.body;
  const { id } = req.user;

  Product.destroy({ where: { id: productId, userId: id } })
    .then(() => {
      console.log("Product deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Could not delete product:", err);
    });
}

// Get all products and render them
export function getProducts(req, res, next) {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
}
