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
  console.log(`Example app listening on port ${port}`);
});
// import { Response } from "express";
// require("dotenv").config();
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const { v4: uuidv4 } = require("uuid");

// const sessions = require("express-session");

// const router = require("./router.route");

// const xss = require("xss-clean");
// const path = require("path");
// const cors = require("cors");

// const app = express();

// // const oneDay = 1000 * 60 * 60 * 24;

// app.use(cors);
// app.use(express.json());
// app.use(cookieParser());

// // app.use("/api", router);

// // app.post("/api/park", (req, res) => {
// //   console.log("abcdefgh");
// //   res.json({
// //     res: "res",
// //   });
// // });

// app.get("/test", (req, res) => {
//   console.log("TEST GOT");
// });

// app.get("/", (req, res) => {
//   console.log("Home");
// });

// // app.use(express.static(path.join(__dirname, "Client")));

// app.listen(5000, () => {
//   console.log("Running at port " + process.env.APP_PORT);
// });
