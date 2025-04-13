import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'ad236d8453e941128cb040276b5ecb1c';

const GameModel = ({ gameId, onClose }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (gameId) {
        const res = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
        setGame(res.data);
      }
    };
    fetchGame();
  }, [gameId]);

  if (!game) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold text-gray-600 dark:text-white">
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2 dark:text-white">{game.name}</h2>
        <img src={game.background_image} alt={game.name} className="rounded mb-4 w-full max-h-[300px] object-cover" />
        <p className="dark:text-white" dangerouslySetInnerHTML={{ __html: game.description }}></p>
        <p className="mt-2 dark:text-white"><strong>Rating:</strong> {game.rating} / {game.rating_top}</p>
        <p className="dark:text-white"><strong>Genres:</strong> {game.genres.map(g => g.name).join(', ')}</p>
        <p className="dark:text-white"><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default GameModel;
