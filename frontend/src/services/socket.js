import { io } from "socket.io-client";

// Koneksi ke server backend
const socket = io("http://localhost:3000", {
	transports: ["websocket", "polling"],
});

// Event ketika terhubung ke server
socket.on("connect", () => {
	console.log("Connected to Socket.IO server with ID:", socket.id); // Log socket ID
});

// Event ketika terjadi disconnect
socket.on("disconnect", () => {
	console.log("Disconnected from Socket.IO server");
});

export default socket;
