const mailgun = require("mailgun-js");

const mailgunHelper = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN_NAME
});

module.exports = { mailgunHelper };
