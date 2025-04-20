import React, { useEffect, useState } from 'react';
import { getUserLists } from '../utils/listStorage';
import { getTrendingGames } from '../Services/GameAPI';
import { generateRecommendations } from '../utils/recommend';
import { useNavigate } from 'react-router-dom';

const Recommendations = ({ username }) => {
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userLists = getUserLists(username);
    const userGames = Object.values(userLists).flat();

    getTrendingGames().then(allGames => {
      const results = generateRecommendations(userGames, allGames);
      setRecommended(results);
    });
  }, [username]);

  return (
    <div className="p-6">
        <button
            onClick={() =>navigate('/')}
            className="mb-6 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        ← Back to Home
      </button>
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Recommended For You</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.map(game => (
          <div key={game.id} className="bg-slate-700 text-white rounded-lg p-2">
            <img src={game.background_image} className="rounded mb-2" />
            <h2 className="font-bold">{game.name}</h2>
            <p className="text-sm text-gray-300">{game.genres?.map(g => g.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
