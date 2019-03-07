const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models")

router.get("/", (req, res, next) => {
  res.send("GET /wiki");
});

router.post("/", async (req, res, next) => {
  console.log(req.params)
  const page = new Page({
    title: req.body.title,
    slug: "temp-slug",
    content: req.body.content,
    status: req.body.status
  });
  try {
    await page.save();
    res.redirect("/")
  }
  catch (error) {
    next(error)
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});


module.exports = router;
