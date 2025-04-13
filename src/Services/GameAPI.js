// Services/GameAPI.js
import axios from 'axios';

const API_KEY = 'ad236d8453e941128cb040276b5ecb1c';
const BASE_URL = 'https://api.rawg.io/api';

export const searchGames = async (query) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      search: query,
      page_size: 12,
    },
  });
  return response.data.results;
};

export const getTrendingGames = async () => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      ordering: '-rating',
      page_size: 10,
    },
  });
  return response.data.results;
};

export const getGamesByGenre = async (genreSlug) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      genres: genreSlug,
      page_size: 10,
    },
  });
  return response.data.results;
};
