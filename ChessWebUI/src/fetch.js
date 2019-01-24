/* global localStorage */

import axios from 'axios'

const API_URL = process.env.API_URL  || 'https://localhost:5001/api/' || 'https://chesstournamentapi.azurewebsites.net/api/';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})