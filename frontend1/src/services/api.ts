import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333', // Confirme que esta URL é a mesma do backend
});
