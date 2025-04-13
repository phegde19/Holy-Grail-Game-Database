import axios from 'axios';

const API_KEY = 'ad236d8453e941128cb040276b5ecb1c';
const BASE_URL = 'https://api.rawg.io/api';

export const getGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genres`, {
    params: { key: API_KEY }
  });
  return res.data.results;
};

export const getGamesByGenre = async (slug) => {
  const res = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      genres: slug,
      page_size: 20,
    },
  });
  return res.data.results;
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
  const res = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      search: query,
      page_size: 12,
    },
  });
  return res.data.results;
};
