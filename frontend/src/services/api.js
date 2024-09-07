import axios from "axios";

// Buat instance Axios
const api = axios.create({
	baseURL: "http://localhost:3000", // Base URL Backend
	timeout: 5000, // Set timeout  request
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor untuk menambahkan token JWT jika ada
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token"); // Ambil token dari localStorage
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default api;
