const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

const sendResetPasswordEmail = async (email, token) => {
	const resetLink = `http://localhost:5173/reset-password?token=${token}`;

	const mailOptions = {
		from: process.env.GMAIL_USER,
		to: email,
		subject: "Reset Password Link",
		html: `<p>You requested a password reset</p>
           <p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendResetPasswordEmail;
