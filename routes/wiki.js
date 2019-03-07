const express = require("express");
const router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const mainPage = await Page.findAll();
    res.send(main(mainPage));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // const page = new Page({
  //   title: req.body.title,
  //   slug: req.body.slug,
  //   content: req.body.content,
  //   status: req.body.status
  // });
  function generateSlug(title) {
    return title.replace(/\s+/g, "_").replace(/\W/g, "");
  }

  try {
    Page.beforeValidate((userInstance, optionsObject) => {
      userInstance.slug = generateSlug(userInstance.title).toLowerCase();
    });

    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const page = await Page.create(req.body);

    page.setAuthor(user);

    // await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug }
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
