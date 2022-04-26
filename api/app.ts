declare module "express-session" {
  interface Session {
    email: string;
  }
}
require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const sessions = require("express-session");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const router = require("./router.route");

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    genid: function (req) {
      return "" + uuidv4() + "-" + new Date().getTime();
    },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

