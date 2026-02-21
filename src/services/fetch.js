/* global localStorage */

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + "api/" || 'https://bracketjd-api.azurewebsites.net/api/' || 'https://localhost:5001/api/';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(config => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
  } catch (e) { /* ignore parse errors */ }
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    const isLoginPage = window.location.pathname.toLowerCase().startsWith('/login');
    if (!isLoginPage) {
      const redirect = '?redirect=' + encodeURIComponent(window.location.pathname);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/Login' + redirect;
      }
      if (error.response && error.response.status === 403) {
        window.location.href = '/Login' + redirect;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;