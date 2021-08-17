const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const config = require("./config");

const homeRouter = require("./routes/homeRouter");
const profileRouter = require("./routes/profileRouter");
const journalRouter = require("./routes/journalRouter");
const settingRouter = require("./routes/settingRouter");
const userRouter = require("./routes/userRouter");

const mongoose = require("mongoose");

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  () => console.log("Connected correctly to server"),
  (err) => console.log(err)
);

const app = express();

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log(
      `Redirecting to: https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
    res.redirect(
      301,
      `https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/profile", profileRouter);
app.use("/journal", journalRouter);
app.use("/settings", settingRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
