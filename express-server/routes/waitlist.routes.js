const router = require("express").Router();
const WaitlistControllers = require("../controllers/waitlist.controllers");
const { check } = require("express-validator");

router.post(
  "/join/:id",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter your valid email address."),
    check("name")
      .isLength({ min: 1 })
      .withMessage("Please enter your name")
  ],
  WaitlistControllers.joinWaitlist
);

module.exports = router;
