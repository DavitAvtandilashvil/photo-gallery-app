import axios from "axios";

// Create axios instance
const unsplashClient = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    "Content-Type": "application/json",
  },
});

export default unsplashClient;
