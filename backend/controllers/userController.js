let io;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userSocketMap } = require("../config/socket");
const sendResetPasswordEmail = require("../utils/mailer");

// Function to set `io` from the outside
exports.setSocketIo = (socketIo) => {
	io = socketIo;
};

// Register function
exports.register = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user in the database
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				isNewUser: true,
			},
		});

		const socketId = userSocketMap[email];
		if (socketId) {
			io.to(socketId).emit("notification", `Welcome ${newUser.email}!`);
			console.log(`Private notification sent to ${newUser.email}`);
		} else {
			console.log(`No socket ID found for user ${email}`);
		}

		res
			.status(201)
			.json({ message: "User registered successfully", user: newUser });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ error: "Error registering user" });
	}
};

// Forgot Password function
exports.forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		// Find user by email
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Generate password reset token
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			},
		);

		// Send the reset email
		await sendResetPasswordEmail(user.email, token);
		console.log(`Password reset email sent to ${user.email}`);

		// Respond with success message
		res.json({ message: "Reset link sent to your email" });
	} catch (error) {
		console.error("Error sending reset link:", error);
		res.status(500).json({ error: "Failed to send reset link" });
	}
};

// Reset Password function
exports.resetPassword = async (req, res) => {
	try {
		const { token, newPassword } = req.body;

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check if the token has the email
		if (!decoded.email) {
			return res.status(400).json({ error: "Invalid token. Email missing." });
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the user's password in the database
		await prisma.user.update({
			where: { id: decoded.id },
			data: { password: hashedPassword },
		});

		// Cari socket ID user yang mengganti password
		const socketId = userSocketMap[decoded.email];
		if (socketId) {
			// Kirim notifikasi private ke user melalui Socket.IO
			io.to(socketId).emit(
				"notification",
				"Your password has been successfully changed.",
			);
			console.log(`Notifikasi pribadi dikirim ke ${decoded.email}`);
		} else {
			console.log(`Socket ID tidak ditemukan untuk user ${decoded.email}`);
		}

		// Respond with success message
		res.status(200).json({ message: "Password updated successfully" });
	} catch (error) {
		console.error("Error resetting password:", error);
		if (error.name === "TokenExpiredError") {
			res.status(401).json({ message: "Token expired" });
		} else {
			res.status(400).json({ message: "Invalid or expired token" });
		}
	}
};
