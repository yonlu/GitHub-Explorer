import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: 'Bearer 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',
    'Content-Type': 'application/json',
  },
});

export default api;
