// written by: Pritam Hegde
// tested by: Pritam Hegde
// debugged by: Pritam Hegde
import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = '/api';

export { API_KEY }; // Export the API_KEY if needed elsewhere

export const getGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genres`, {
    params: { key: API_KEY }
  });
  return res.data.results;
};

export const getGamesByGenre = async (slug, filters = {}) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      genres: slug,
      page_size: 20,
      ...filters, // ← inject filters like esrb_rating, platforms, etc.
    },
  });
  return response.data.results;
};

export const getTrendingGames = async () => {
  const res = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      ordering: '-rating',
      page_size: 12,
    },
  });
  return res.data.results;
};

export const searchGames = async (query) => {
  const params = {
    key: import.meta.env.VITE_RAWG_API_KEY,
    search: query,
    page_size: 12,
  };

  
  console.log('🔍 searchGames() - Sending request with params:', params);

  const res = await axios.get(`/api/games`, { params });
  return res.data.results;
};


