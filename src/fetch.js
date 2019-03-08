/* global localStorage */

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || 'https://chesstournamentapi.azurewebsites.net/api/' || 'https://localhost:5001/api/' ;

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})