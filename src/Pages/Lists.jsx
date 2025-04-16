import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';

function Lists({ username }) {
  const [lists, setLists] = useState({
    favorites: [],
    playing: [],
    completed: [],
    wishlist: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with actual fetch or load from localStorage for now
    const savedLists = JSON.parse(localStorage.getItem(username + "_lists")) || {};
    setLists((prev) => ({ ...prev, ...savedLists }));
  }, [username]);

  return (
    <div className="p-6 text-black dark:text-white">
      <button
            onClick={() =>navigate('/')}
            className="mb-6 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        ← Back to Home
      </button>
      <h2 className="text-3xl font-bold mb-6">My Game Lists</h2>

      {Object.entries(lists).map(([key, games]) => (
        <div key={key} className="mb-8">
          <h3 className="text-xl font-semibold capitalize mb-2">{key}</h3>
          {games.length === 0 ? (
            <p className="text-gray-400 italic">No games added yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {games.map((game) => (
                <div key={game.id} className="bg-slate-700 p-2 rounded shadow">
                  <img src={game.background_image} className="rounded h-[200px] object-cover w-full" />
                  <h4 className="text-lg font-bold mt-2">{game.name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Lists;
