// written by: Pritam Hegde
// tested by: Pritam Hegde
// debugged by: Pritam Hegde
import React, { useEffect, useState } from 'react';
import GameModel from './GameModel';
import { getGamesByGenre } from '../Services/GameAPI';

function DisplaySearch({ gameList, selectedGenre, onAddToList }) {
  const [filteredGames, setFilteredGames] = useState(gameList || []);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchFilteredGames = async () => {
      if (!selectedGenre) {
        setFilteredGames(gameList);
        return;
      }

      const params = {};
      if (selectedPlatform) params.platforms = selectedPlatform;
      if (selectedYear) params.dates = `${selectedYear}-01-01,${selectedYear}-12-31`;

      try {
        const results = await getGamesByGenre(selectedGenre, params);
        setFilteredGames(results);
      } catch (err) {
        console.error('Filter fetch failed:', err);
      }
    };

    fetchFilteredGames();
  }, [selectedGenre, selectedPlatform, selectedYear, gameList]);

  return (
    <div>
      <h1 className="text-center text-2xl text-blue-400 dark:text-purple-400 font-bold my-4">Search Results</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-4 dark:text-black">
        <select onChange={(e) => setSelectedPlatform(e.target.value)} className="p-2 text-black bg-gray-400 dark:bg-gray-600 rounded">
          <option value="">All Platforms</option>
          <option value="4">PC</option>
          <option value="7">Nintendo Switch</option>
          <option value="18">PS4</option>
          <option value="187">PS5</option>
          <option value="1">Xbox One</option>
        </select>

        <input
          type="number"
          className="p-2 rounded bg-gray-400 text-black dark:text-slate-200 dark:bg-gray-600"
          placeholder="Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-2">
        {filteredGames.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedGameId(item.id)}
            className="bg-gray-400 rounded-xl group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer border"
          >
            <img
              src={item.background_image}
              alt={item.name}
              className="w-full h-[270px] object-cover rounded-xl"
            />
            <h2 className="text-[20px] font-bold p-2 dark:text-white">{item.name}</h2>

            {/* Add to List Dropdown */}
            <select
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                if (e.target.value !== '') {
                  onAddToList(item, e.target.value);
                  e.target.selectedIndex = 0; // reset dropdown
                }
              }}
              className="m-2 p-1 text-sm rounded bg-white dark:bg-gray-600 text-black dark:text-white border"
              defaultValue=""
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
}

export default DisplaySearch;
