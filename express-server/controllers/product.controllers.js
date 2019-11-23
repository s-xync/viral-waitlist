const Product = require("../models/product.model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");
const { mailgunHelper } = require("../config/mailgun");

const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      creatorName,
      creatorEmail,
      productName,
      productDescription
    } = req.body;

    const product = await Product.create({
      creatorName,
      creatorEmail,
      productName,
      productDescription
    });

    const mailData = {
      from: process.env.MAILGUN_FROM,
      to: creatorEmail,
      subject: `Your product has been created on Viral Waitlist`,
      text: `Your product has been created on Viral Waitlist. You can access the leaderboard for your product using the following link ${process.env.CLIENT_URL}/product/${product._id}.`
    };

    try {
      await mailgunHelper.messages().send(mailData);
    } catch (err) {
      console.log(err);
    }

    return res.json({ product, msg: "Product created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [
        {
          msg: "Something went wrong. Please try again."
        }
      ]
    });
  }
};

module.exports = { create };
