const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", (req, res, next) => {
	res.send("respond with a resource");
});

router.post("/register", userController.register);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
