import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("tf_currentUser"));
  const token = user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth --------------------------
export const registerUser = (name, email, password) =>
  API.post("/auth/register", { username: name, email, password });

export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

// Tasks -------------------------
export const getTasks = () => API.get("/tasks");

export const createTask = (title) =>
  API.post("/tasks", { title });

export const updateTask = (id, completed) =>
  API.put(`/tasks/${id}`, { completed });

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);
