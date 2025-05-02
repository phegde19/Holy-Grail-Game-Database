// written by: Pritam Hegde
// tested by: Pritam Hegde
// debugged by: Pritam Hegde
import React, { useEffect, useState } from 'react';
import { getUserLists, saveUserLists } from '../utils/listStorage';
import { getTrendingGames } from '../Services/GameAPI';
import { generateRecommendations } from '../utils/recommend';
import GameModel from '../components/GameModel';
import { Link } from 'react-router-dom';

const Recommendations = ({ username }) => {
  const [recommended, setRecommended] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const userLists = getUserLists(username);
    const userGames = Object.values(userLists).flat();

    getTrendingGames().then(allGames => {
      const results = generateRecommendations(userGames, allGames);
      setRecommended(results);
    });
  }, [username]);

  const handleAddToList = (game, listName) => {
    if (!listName) return;

    const lists = getUserLists(username);
    if (!lists[listName]) {
      alert(`List type does not exist: ${listName}`);
      return;
    }

    const alreadyExists = lists[listName].some(g => g.id === game.id);
    if (alreadyExists) {
      alert(`${game.name} is already in ${listName}`);
      return;
    }

    lists[listName].push(game);
    saveUserLists(username, lists);
    alert(`${game.name} added to ${listName}`);
  };

  return (
    <div className="p-6">
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block">
        ← Home
      </Link>

      <h1 className="text-3xl font-bold text-blue-500 mb-6">Recommended For You</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.map((game) => (
          <div key={game.id} className="bg-slate-700 text-white rounded-lg p-3">
            <img
              src={game.background_image}
              className="rounded mb-2 cursor-pointer w-full h-[200px] object-cover"
              onClick={() => setSelectedGameId(game.id)}
              alt={game.name}
            />
            <h2 className="font-bold text-sm">{game.name}</h2>
            <p className="text-xs text-gray-300 mb-2">{game.genres?.map(g => g.name).join(', ')}</p>

            <select
              onChange={(e) => handleAddToList(game, e.target.value)}
              defaultValue=""
              className="text-black rounded p-1 text-sm w-full"
            >
              <option value="" disabled>+ Add to List</option>
              <option value="favorites">Favorites</option>
              <option value="playing">Playing</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
              <option value="played">Played</option>
            </select>
          </div>
        ))}
      </div>

      {selectedGameId && (
        <GameModel gameId={selectedGameId} onClose={() => setSelectedGameId(null)} />
      )}
    </div>
  );
};

export default Recommendations;
