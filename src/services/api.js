import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
  }
});