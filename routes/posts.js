const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const statusHandle = require("../statusHandle");

router.get("/posts", async (req, res) => {
  const data = await Post.find();
  console.log(data, "data");
  statusHandle(res, 200, data);
});

router.post("/posts", async (req, res) => {
  console.log(req);
  try {
    const body = req.body;
    const data = await Post.create(body);
    statusHandle(res, 200, data);
  } catch (err) {
    console.log(err, "error");
    statusHandle(res, 400, [], "參數有誤");
  }
});

router.delete("/posts", async (req, res) => {
  await Post.deleteMany({});
  statusHandle(res, 200, []);
});

router.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Post.findByIdAndDelete(id);
    statusHandle(res, 200, data);
  } catch (err) {
    console.log(err, "error");
    statusHandle(res, 400, [], "id 不存在");
  }
});

router.patch("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Post.findByIdAndUpdate(id, req.body);
    statusHandle(res, 200, data);
  } catch (err) {
    console.log(err, "error");
    statusHandle(res, 400, [], " 或 id 不存在");
  }
});

module.exports = router;
