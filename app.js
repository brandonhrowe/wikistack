const express = require("express");
const morgan = require("morgan");
const app = express();
const { Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.get("/", (req, res, next) => {
  res.redirect("/wiki")
})

app.get("/", (req, res) => {
  res.send("Hello world");
});

const init = async () => {
  await Page.sync();
  await User.sync();
  app.listen(1337, () => {
    console.log("Running on port 1337");
  });
};

init();
