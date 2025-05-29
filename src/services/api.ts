import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // substitua pela URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
