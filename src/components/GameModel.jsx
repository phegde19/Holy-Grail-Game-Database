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

        {game.background_image && (
          <img
            src={game.background_image}
            alt={game.name}
            className="rounded mb-4 w-full max-h-[300px] object-cover"
          />
        )}

        {game.description && (
          <p
            className="dark:text-white"
            dangerouslySetInnerHTML={{ __html: game.description }}
          ></p>
        )}

        {game.rating && (
          <p className="mt-2 dark:text-white">
            <strong>Rating:</strong> {game.rating} / 4
          </p>
        )}

        {game.released && (
          <p className="dark:text-white">
            <strong>Release Date:</strong> {game.released}
          </p>
        )}

        {game.genres?.length > 0 && (
          <p className="dark:text-white">
            <strong>Genres:</strong> {game.genres.map(g => g.name).join(', ')}
          </p>
        )}

        {game.platforms?.length > 0 && (
          <p className="dark:text-white">
            <strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}
          </p>
        )}

        {game.publishers?.length > 0 && (
          <p className="dark:text-white">
            <strong>Publishers:</strong> {game.publishers.map(pub => pub.name).join(', ')}
          </p>
        )}

        {game.metacritic && (
          <p className="dark:text-white">
            <strong>Metacritic Score:</strong> {game.metacritic}
          </p>
        )}

        {game.esrb_rating?.name && (
          <p className="dark:text-white">
            <strong>ESRB Rating:</strong> {game.esrb_rating.name}
          </p>
        )}

        {game.website && (
          <p className="dark:text-white">
            <strong>Website:</strong>{' '}
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 underline transition-colors duration-200 !text-sky-400 dark:!text-sky-400"
            >
              Visit
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default GameModel;
