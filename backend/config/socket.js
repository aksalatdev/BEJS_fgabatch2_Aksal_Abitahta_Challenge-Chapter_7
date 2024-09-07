const { Server } = require("socket.io");

const userSocketMap = {}; // Mapping user email to Socket ID

const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:5173",
		},
	});

	io.on("connection", (socket) => {
		console.log("A user connected:", socket.id);

		// Listener to register user with their email
		socket.on("registerUser", (email) => {
			if (userSocketMap[email]) {
				console.log(
					`User with email ${email} is already connected with socket ID: ${userSocketMap[email]}`,
				);
			}
			userSocketMap[email] = socket.id; // Use email to map to socket ID
			console.log(`Socket ID for ${email} saved: ${socket.id}`);
		});

		// Handle disconnect and clean up the mapping
		socket.on("disconnect", () => {
			const email = Object.keys(userSocketMap).find(
				(key) => userSocketMap[key] === socket.id,
			);
			if (email) {
				delete userSocketMap[email]; // Remove the socket ID when the user disconnects
				console.log(`Socket ID for ${email} removed on disconnect.`);
			}
			console.log("User disconnected:", socket.id);
		});
	});

	return io;
};

module.exports = { initializeSocket, userSocketMap };
