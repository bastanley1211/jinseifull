const express = require("express");
const homeRouter = express.Router();
const cors = require("./cors");
const authenticate = require("../authenticate");

/* GET home page. */
homeRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, function (req, res, next) {
    res.render("index", { title: "Express" });
  })
  .post((req, res) => {
    res.end(
      `Will add the post: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /home");
  })
  .delete((req, res) => {
    res.end("DELETE operation not supported on /home");
  });

homeRouter
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

module.exports = homeRouter;

module.exports = homeRouter;
