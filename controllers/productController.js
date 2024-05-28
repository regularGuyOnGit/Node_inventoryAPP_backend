const Products = require("../models/product");
const Categories = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// For handling GET index page.

exports.index = asyncHandler(async (req, res, next) => {
  const [prods, catgs] = await Promise.all([
    Products.find().countDocuments().exec(),
    Categories.find().countDocuments().exec(),
  ]);
  res.render("index", {
    title: "Spare The Car",
    products: prods,
    categories: catgs,
  });
});
// Product List
exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await Products.find().sort({ name: 1 }).exec();

  res.render("product_list", {
    title: "All Products In The Inventory",
    products,
  });
});

// Product Details page

exports.product_detail = asyncHandler(async (req, res, next) => {
  const specificProduct = await Products.findById(req.params.id).exec();

  res.render("product_details", {
    title: specificProduct.name,
    product: specificProduct,
  });
});

// Get Product form
exports.get_product_form = (req, res, next) => {
  res.render("product_form", {
    title: "Create A New Product",
  });
};
// Handling post Request Product Form

exports.post_product_form = [
  body("name", "Name is compulsory Field").trim().isLength({ min: 1 }).escape(),
  body("description", "Description of a product is compulsory")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Length of the description should be atleast 5 characters")
    .escape(),
  body("category", "Category is compulsory Field")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price is compulsory Field")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Number in stock is compulsory Field")
    .trim()
    .isNumeric()
    .withMessage("Field has to be numeric")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const productToAdd = new Products({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });

    if (!error.isEmpty()) {
      res.render("product_form", {
        title: "Create A New Product",
        product: productToAdd,
        errors: error.array(),
      });
      return;
    } else {
      await productToAdd.save();
      res.redirect(productToAdd.url);
    }
  }),
];

// Get Product delete

exports.get_products_delete = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id).exec();

  if (product == null) {
    const error = new Error("No such product is found");
    error.status = 404;
    return next(error);
  }

  res.render("product_delete", {
    title: "Product Delete",
    product,
  });
});

// Post Product delete

exports.post_products_delete = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id).exec();

  if (product == null) {
    const error = new Error("No such product is found");
    error.status = 404;
    return next(error);
  } else {
    await Products.findByIdAndDelete(req.body.product_delete);
    res.redirect("/products");
  }
});

// Get products update

exports.get_product_update = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id).exec();

  if (product == null) {
    const error = new Error("No such product is found");
    error.status = 404;
    return next(error);
  }
  res.render("product_form", {
    title: "Update the Product",
    product,
  });
});

exports.post_product_update = [
  body("name", "Name field is mandatory").trim().isLength({ min: 1 }).escape(),
  body("description", "Description field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Number in stock field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const productToUpdate = new Products({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.id,
    });

    if (!error.isEmpty()) {
      res.render("product_form", {
        title: "Update the Product",
        product: productToUpdate,
      });
    } else {
      const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        productToUpdate,
        {}
      );
      res.redirect(updatedProduct.url);
    }
  }),
];

// Authenticate user for update product

exports.get_product_authenticate = (req, res, next) => {
  res.render("authenticate_form_product", {
    title: "User Authentication",
  });
};

exports.post_product_authenticate = [
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render("authenticate_form_product", {
        title: "User Authentication",
        error: error.array(),
      });
    } else if (
      req.body.username !== "nitinR" ||
      req.body.password !== "nitinR"
    ) {
      res.render("authenticate_form_product", {
        title: "User Authentication",
        error: error.array(),
        message: "&#8226; username and password is incorrect !",
      });
    } else {
      const product = await Products.findById(req.params.id);
      if (req.body.username == "nitinR" && req.body.password == "nitinR") {
        res.redirect(product.url + "/update");
      }
    }
  }),
];

// Authenticate user for delete product
exports.get_product_authenticate_delete = (req, res, next) => {
  res.render("authenticate_form_product", {
    title: "User Authentication",
  });
};

exports.post_product_authenticate_delete = [
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render("authenticate_form_product", {
        title: "User Authentication",
        error: error.array(),
      });
    } else if (
      req.body.username !== "nitinR" ||
      req.body.password !== "nitinR"
    ) {
      res.render("authenticate_form_product", {
        title: "User Authentication",
        error: error.array(),
        message: "&#8226; username and password is incorrect !",
      });
    } else {
      const product = await Products.findById(req.params.id);
      if (req.body.username == "nitinR" && req.body.password == "nitinR") {
        res.redirect(product.url + "/delete");
      }
    }
  }),
];
