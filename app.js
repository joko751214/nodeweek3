const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config({ path: "./config.env" });
const statusHandle = require("./statusHandle");

const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("資料庫連線成功"))
  .catch((err) => console.log(err));

const postsRouter = require("./routes/posts");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", postsRouter);
app.use(function (err, req, res, next) {
  // console.error(err.stack);
  statusHandle(res, 400, [], "格式錯誤");
});

module.exports = app;
