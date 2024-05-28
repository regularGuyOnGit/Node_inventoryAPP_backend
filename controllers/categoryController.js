const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/product");
// Creating the read part of the category.

exports.get_list_category = expressAsyncHandler(async (req, res, next) => {
  const category = await Category.find().sort({ name: 1 }).exec();

  res.render("categoryList", {
    title: "Category Listings",
    category,
  });
});

// Reading a specific category with its list init.

exports.category_items = expressAsyncHandler(async (req, res, next) => {
  const specificCategory = await Category.findById(req.params.id)
    .populate("products")
    .exec();

  res.render("category_items", {
    title: specificCategory.name,
    description: specificCategory.description,
    category: specificCategory,
  });
});

// Creating form
exports.get_category_form = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ name: 1 }).exec();

  res.render("category_form", {
    title: "Create Category",
    products,
  });
});

exports.post_category_form = [
  (req, res, next) => {
    if (!Array.isArray(req.body.products)) {
      req.body.products == undefined ? [] : [req.body.products];
    }
    next();
  },
  body("name", "Name field must no be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description field must no be empty")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("products.*").escape(),

  expressAsyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const createCategory = new Category({
      name: req.body.name,
      description: req.body.description,
      products: req.body.products,
    });

    if (!error.isEmpty()) {
      const products = await Product.find().sort({ name: 1 }).exec();

      for (const product of products) {
        if (createCategory.products.includes(product._id)) {
          product.checked = "true";
        }
      }
      res.render("category_form", {
        title: "Category Form",

        products,
        category: createCategory,
        errors: error.array(),
      });
    } else {
      //  save the book in the db.

      await createCategory.save();
      res.redirect(createCategory.url);
    }
  }),
];

// Delete Category

exports.get_category_delete = expressAsyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category == null) {
    const error = new Error("no such category found");
    error.status = 404;
    return next(error);
  }

  res.render("category_delete", {
    title: "Delete Category",
    category,
  });
});

exports.post_category_delete = expressAsyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  if (category == null) {
    const error = new Error("no such category found");
    error.status = 404;
    return next(error);
  } else {
    await Category.findByIdAndDelete(req.body.category_delete);
    res.redirect("/categories");
  }
});

// Update Category
exports.get_category_update = expressAsyncHandler(async (req, res, next) => {
  const [categories, products] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find().sort({ name: 1 }).exec(),
  ]);

  products.map((item) => {
    if (categories.products.includes(item._id)) {
      item.checked = "true";
    }
  });
  res.render("category_form", {
    title: "Update Category",
    category: categories,
    products,
  });
});

exports.post_category_update = [
  (req, res, next) => {
    if (!Array.isArray(req.body.products)) {
      typeof req.body.products == undefined ? [] : [req.body.products];
    }
    next();
  },

  body("name", "Name Field is mandatory").trim().isLength({ min: 1 }).escape(),
  body("description", "Description Field is mandatory")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("products.*").optional({ values: "falsy" }).escape(),

  expressAsyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const categoryToBeUpdated = new Category({
      name: req.body.name,
      description: req.body.description,
      products: req.body.products,
      _id: req.params.id,
    });

    if (!error.isEmpty()) {
      const products = await Product.find().sort({ name: 1 }).exec();

      products.map((items) => {
        if (categoryToBeUpdated.products.includes(items._id)) {
          items.checked = "true";
        }
      });
      res.render("category_form", {
        title: "Update Category",
        category: categoryToBeUpdated,
        products,
        errors: error.array(),
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        categoryToBeUpdated,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];

// Authentication update

exports.get_category_authentication_update = (req, res, next) => {
  res.render("authenticate_form_category", {
    title: "Authenticate User",
  });
};
exports.post_category_authentication_update = [
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  expressAsyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render("authenticate_form_category", {
        title: "Authenticate User",
        error: error.array(),
      });
    } else if (
      req.body.username !== "nitinR" ||
      req.body.password !== "nitinR"
    ) {
      res.render("authenticate_form_category", {
        title: "Authenticate User",
        error: error.array(),
        message: "&#8226; username and password is incorrect !",
      });
    } else {
      const category = await Category.findById(req.params.id);
      if (req.body.username == "nitinR" && req.body.password == "nitinR") {
        res.redirect(category.url + "/update");
      }
    }
  }),
];

exports.get_category_authentication_delete = (req, res, next) => {
  res.render("authenticate_form_category", {
    title: "Authenticate User",
  });
};
exports.post_category_authentication_delete = [
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username", "Username field is mandatory")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  expressAsyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render("authenticate_form_category", {
        title: "Authenticate User",
        error: error.array(),
      });
    } else if (
      req.body.username !== "nitinR" ||
      req.body.password !== "nitinR"
    ) {
      res.render("authenticate_form_category", {
        title: "Authenticate User",
        error: error.array(),
        message: "&#8226; username and password is incorrect !",
      });
    } else {
      const category = await Category.findById(req.params.id);
      if (req.body.username == "nitinR" && req.body.password == "nitinR") {
        res.redirect(category.url + "/delete");
      }
    }
  }),
];
