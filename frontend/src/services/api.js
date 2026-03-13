// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

// Auth APIs
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

// Products APIs
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);

// Orders APIs
export const createOrder = (data) => axios.post(`${API_URL}/orders`, data);
export const getOrdersByUser = (userId) => axios.get(`${API_URL}/orders/${userId}`);
