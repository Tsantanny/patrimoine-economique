import axios from "axios";

const instance = axios.create({
  baseURL: "https://patrimoine-economique-backend-h2l4.onrender.com",
  // baseURL: "http://localhost:8080",
});

export default instance;
