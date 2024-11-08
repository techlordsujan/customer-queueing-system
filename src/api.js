// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://eon.cmd.com.np/api", // Ensure this matches your backend URL
});

export default api;
