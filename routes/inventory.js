const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");

//! Products

// Index page
router.get("/homepage", productController.index);

// Get request for product creation from
router.get("/products/create", productController.get_product_form);
router.post("/products/create", productController.post_product_form);

// All Products List
router.get("/products", productController.product_list);

// Authentice user Product Update
router.get(
  "/products/:id/authenticate/update",
  productController.get_product_authenticate
);
router.post(
  "/products/:id/authenticate/update",
  productController.post_product_authenticate
);

// Authentice user Product Delete.
router.get(
  "/products/:id/authenticate/delete",
  productController.get_product_authenticate_delete
);
router.post(
  "/products/:id/authenticate/delete",
  productController.post_product_authenticate_delete
);

// Delete product

router.get("/products/:id/delete", productController.get_products_delete);
router.post("/products/:id/delete", productController.post_products_delete);

// Update Product
router.get("/products/:id/update", productController.get_product_update);
router.post("/products/:id/update", productController.post_product_update);

// Specific Product Detail Page
router.get("/products/:id", productController.product_detail);

//! Category

// Category Read page get request

router.get("/categories", categoryController.get_list_category);

// Category  Creation
router.get("/category/create", categoryController.get_category_form);
router.post("/category/create", categoryController.post_category_form);

// Delete Category

router.get("/categories/:id/delete", categoryController.get_category_delete);
router.post("/categories/:id/delete", categoryController.post_category_delete);

// Update Category Authentication
router.get(
  "/categories/:id/authenticate/update",
  categoryController.get_category_authentication_update
);
router.post(
  "/categories/:id/authenticate/update",
  categoryController.post_category_authentication_update
);
// Delete Category Authentication
router.get(
  "/categories/:id/authenticate/delete",
  categoryController.get_category_authentication_delete
);
router.post(
  "/categories/:id/authenticate/delete",
  categoryController.post_category_authentication_delete
);

// Category Update

router.get("/categories/:id/update", categoryController.get_category_update);
router.post("/categories/:id/update", categoryController.post_category_update);

// Category Products read Page;
router.get("/categories/:id", categoryController.category_items);

module.exports = router;
