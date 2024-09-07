const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return res.status(404).json({ error: "User not found" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(401).json({ error: "Invalid password" });

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
};
