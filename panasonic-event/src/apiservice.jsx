
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/users" });

export const registerUser = (data) => API.post("/register", data);
export const verifyUser = (token) => API.get(`/verify/${token}`);
export const getUsers = () => API.get("/");
