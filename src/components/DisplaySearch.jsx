import React, { useEffect, useState } from 'react';
import GameModel from './GameModel';
import { getGamesByGenre } from '../Services/GameAPI';

function DisplaySearch({ gameList, selectedGenre }) {
  const [filteredGames, setFilteredGames] = useState(gameList || []);
  const [selectedGameId, setSelectedGameId] = useState(null);

  // Filter states
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  

  // ✅ Fetch filtered games whenever genre or filters change
  useEffect(() => {
    const fetchFilteredGames = async () => {
      if (!selectedGenre) {
        setFilteredGames(gameList); // fallback for search results
        return;
      }

      const params = {};
      if (selectedPlatform) params.platforms = selectedPlatform;
      if (selectedYear) params.dates = `${selectedYear}-01-01,${selectedYear}-12-31`;

      try {
        const results = await getGamesByGenre(selectedGenre, params);

        let filtered = results;
        

        setFilteredGames(filtered);
      } catch (err) {
        console.error('Filter fetch failed:', err);
      }
    };

    fetchFilteredGames();
  }, [selectedGenre, selectedPlatform, selectedYear]);

  // ✅ UI
  return (
    <div>
      <h1 className="text-blue-400 dark:text-purple-400 font-bold">Filtered Results</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-4">
        

        <select onChange={(e) => setSelectedPlatform(e.target.value)} className="p-2 border rounded">
          <option value="">All Platforms</option>
          <option value="4">PC</option>
          <option value="7">Nintendo Switch</option>
          <option value="18">PS4</option>
          <option value="187">PS5</option>
          <option value="1">Xbox One</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          className="p-2 border rounded"
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-2">
        {filteredGames.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedGameId(item.id)}
            className="bg-slate-500 rounded-lg group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
          >
            <img
              src={item.background_image}
              alt={item.name}
              className="w-full h-[270px] object-cover rounded-xl"
            />
            <h2 className="text-[20px] font-bold p-2 dark:text-white">{item.name}</h2>
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
