const router = require("express").Router();
const ProductControllers = require("../controllers/product.controllers");
const { check } = require("express-validator");

router.post(
  "/create",
  [
    check("creatorEmail")
      .isEmail()
      .withMessage("Please enter your valid email address."),
    check("creatorName")
      .isLength({ min: 1 })
      .withMessage("Please enter your name"),
    check("productName")
      .isLength({ min: 1 })
      .withMessage("Please enter product name"),
    check("productDescription")
      .isLength({ min: 1 })
      .withMessage("Please enter product description")
  ],
  ProductControllers.create
);

module.exports = router;
