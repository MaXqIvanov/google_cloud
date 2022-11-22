import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_DEV
});


export default api;