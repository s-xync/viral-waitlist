const Product = require("../models/product.model");
const Waitlist = require("../models/waitlist.model");
const HttpStatus = require("http-status-codes");
const { ObjectId } = require("mongoose").Types;
const { validationResult } = require("express-validator");
const { mailgunHelper } = require("../config/mailgun");

const joinWaitlist = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, referral } = req.body;

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: [
          { msg: "Product not found. Please select a different product." }
        ]
      });
    }

    const waitlistExists = await Waitlist.findOne({
      product: req.params.id,
      email
    });

    if (waitlistExists) {
      const waitlists = await Waitlist.find({ product: product._id }).sort({
        refers: "desc",
        createdAt: "desc",
        waitlistPosition: "desc"
      });

      return res.json({
        waitlist: waitlistExists,
        waitlists,
        referralLink: `${process.env.CLIENT_URL}/product/${waitlistExists.product}?referral=${waitlistExists._id}`,
        msg: "You have already joined the waitlist."
      });
    }

    let referralWaitlist;

    if (referral && ObjectId.isValid(referral)) {
      referralWaitlist = await Waitlist.findOne({ _id: referral });
    }

    const waitlist = await Waitlist.create({
      name,
      email,
      product: product._id,
      waitlistPosition: product.waitlist
    });

    product.waitlist += 1;
    await product.save();

    if (referralWaitlist) {
      waitlist.referral = referralWaitlist._id;
      await waitlist.save();

      referralWaitlist.refers += 1;
      await referralWaitlist.save();

      const mailData = {
        from: process.env.MAILGUN_FROM,
        to: referralWaitlist.email,
        subject: `Your product referral has been used on Viral Waitlist`,
        text: `Your product referral has been used on Viral Waitlist for ${product.productName} by ${name}. You can check your position on the leaderboard using the following link ${process.env.CLIENT_URL}/product/${product._id}.\n\nYou can refer this product using the following link ${process.env.CLIENT_URL}/product/${product._id}?referral=${referralWaitlist._id}. By referring this product, you will grow on the leaderboard and have a chance to skip several positions in the wailist.`
      };

      try {
        await mailgunHelper.messages().send(mailData);
      } catch (err) {
        console.log(err);
      }
    }

    const mailData = {
      from: process.env.MAILGUN_FROM,
      to: email,
      subject: `Your have been added to a waitlist on Viral Waitlist`,
      text: `Your have been added to a waitlist on Viral Waitlist for the product ${product.productName}. You position in the waitlist is ${waitlist.waitlistPosition}. You can access the leaderboard for this product using the following link ${process.env.CLIENT_URL}/product/${product._id}.\n\nYou can refer this product using the following link ${process.env.CLIENT_URL}/product/${product._id}?referral=${waitlist._id}. By referring this product, you will grow on the leaderboard and have a chance to skip several positions in the wailist.`
    };

    try {
      await mailgunHelper.messages().send(mailData);
    } catch (err) {
      console.log(err);
    }

    const waitlists = await Waitlist.find({ product: product._id }).sort({
      refers: "desc",
      createdAt: "desc",
      waitlistPosition: "desc"
    });

    return res.json({
      waitlist,
      waitlists,
      referralLink: `${process.env.CLIENT_URL}/product/${product._id}?referral=${waitlist._id}`,
      msg: "You have joined the waitlist successfully."
    });
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

const getDetails = async (req, res) => {
  try {
    const { email } = req.query;
    const waitlist = await Waitlist.findOne({ email });
    if (!waitlist) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: [
          {
            msg: "You have not joined the wailist. Please join the waitlist."
          }
        ]
      });
    }
    return res.json({
      waitlist,
      referralLink: `${process.env.CLIENT_URL}/product/${waitlist.product}?referral=${waitlist._id}`,
      msg: "Waitlist details retrieved successfully."
    });
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

module.exports = { joinWaitlist, getDetails };
