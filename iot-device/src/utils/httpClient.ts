import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
