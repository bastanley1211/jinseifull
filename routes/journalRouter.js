const express = require("express");
const journalRouter = express.Router();
const cors = require("./cors");
const authenticate = require("../authenticate");

/* GET home page. */
journalRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, function (req, res, next) {
    res.end("User journal: post history");
  })
  .post((req, res) => {
    res.end(
      `Will add the post: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /journal");
  })
  .delete((req, res) => {
    res.end("Deleting the entire post journal");
  });

journalRouter
  .route("/:postId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send all details of post: ${req.params.postId} to you`);
  })
  .post((req, res) => {
    res.end(
      `Will add the post: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the post: ${req.params.postId}\n`);
    res.end(`Will update the post: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting post: ${req.params.postId}`);
  });

module.exports = journalRouter;
