import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
});

// Optional: Add interceptors if needed
// apiClient.interceptors.request.use((config) => {
//   // Example: Attach Authorization token
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
