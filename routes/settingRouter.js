const express = require("express");
const settingRouter = express.Router();
const cors = require("./cors");
const authenticate = require("../authenticate");

/* GET users listing. */
settingRouter
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, function (req, res, next) {
    res.send("User settings");
  })
  .post((req, res) => {
    res.end(`POST operation not supported on /settings`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("Updating Settings");
  })
  .delete((req, res) => {
    res.end(`DELETE operation not supported on /settings`);
  });

settingRouter
  .route("/:settingId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send all details of this setting: ${req.params.settingId} to you`
    );
  })
  .post((req, res) => {
    res.end(
      `POST operation not available in /settings/${req.params.settingId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the setting: ${req.params.postId}\n`);
    res.end(`Will update the setting: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(
      `Clearing setting: ${req.params.settingId} and resetting to default setting`
    );
  });

module.exports = settingRouter;

module.exports = settingRouter;
