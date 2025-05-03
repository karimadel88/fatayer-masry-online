import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:2030", // Base URL for the API
});

export default api;
