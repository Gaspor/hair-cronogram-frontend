import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
  }
});