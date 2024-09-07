const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) return res.status(401).send(401).send("Access Denied");
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).send("Invalid Token");
		req.user = user;
		next();
	});
};

module.exports = authenticateToken;
