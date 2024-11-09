// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Ensure this matches your backend URL
});

export default api;
