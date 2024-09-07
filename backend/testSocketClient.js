const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
	console.log("Connected to server as", socket.id);

	// Listen for notifications
	socket.on("notification", (message) => {
		console.log("Notification received:", message);
	});
});
