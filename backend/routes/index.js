const express = require("express");
const router = express.Router();

const { io } = require("../config/socket");

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("index", { title: "Express" });
});
// router.get("/debug-sentry", (req, res) => {
// 	throw new Error("Testing Sentry error handling!");
// });
router.get("/test-notification", (req, res) => {
	console.log(typeof io);
	io.emit("notification", "Test broadcast message"); // Emit notifikasi broadcast
	res.send("Test notification sent"); // Kirim response ke client
});

module.exports = router;
