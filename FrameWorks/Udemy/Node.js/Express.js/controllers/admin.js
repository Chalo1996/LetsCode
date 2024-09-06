import { Product } from "../models/product.js";

export function getAddProduct(req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
}

export function postAddProduct(req, res, next) {
  const title = req.body.title;
  const url = req.body.url;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, url, price, description);
  product.save();
  res.redirect("/");
}

export function getEditProduct(req, res, next) {
  const { edit } = req.query;
  if (!edit) {
    res.redirect("/");
  }
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.render("admin/edit-product", {
        product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: edit,
      });
    })
    .catch((err) =>
      console.error("Could not find a product with the id:", err)
    );
}

export function postEditProduct(req, res, next) {
  const { productId } = req.body;
  const updatedTitle = req.body.title;
  const updatedUrl = req.body.url;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updatedData = {
    title: updatedTitle,
    ImgUrl: updatedUrl,
    price: updatedPrice,
    description: updatedDescription,
  };

  Product.updateProduct(productId, updatedData)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Could not update the product:", err);
    });
}

export function postDeleteProduct(req, res, next) {
  const { productId } = req.body;
  Product.deleteProduct(productId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Could not delete prodict:", err);
    });
}

export function getProducts(req, res, next) {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products,
        pageTitle: "Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
