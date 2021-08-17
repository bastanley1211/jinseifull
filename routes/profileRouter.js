const express = require("express");
const profileRouter = express.Router();
const cors = require("./cors");
const authenticate = require("../authenticate");

/* GET users listing. */
profileRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, function (req, res, next) {
    res.send("User profile rendered here");
  });

module.exports = profileRouter;
