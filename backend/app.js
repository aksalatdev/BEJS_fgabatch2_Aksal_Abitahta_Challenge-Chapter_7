require("dotenv").config();
require("./instrument.js");
const cors = require("cors");
const Sentry = require("@sentry/node");
const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();

// cors all requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
	res.statusCode = 500;
	res.end(`${res.sentry || "Unknown error"}\n`);
});

module.exports = app;
