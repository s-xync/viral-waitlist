const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpStatus = require("http-status-codes");

// read .env file into environment
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// allow cross origin resource sharing for react app
app.use(cors());

// configure bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = process.env.MONGO_URI;

// connect to mongodb using monogoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
  // useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// product routes
const productRouter = require("./routes/product.routes");
app.use("/product", productRouter);

// any routes that does not match above
app.get("*", (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: "Route Not Found." });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
