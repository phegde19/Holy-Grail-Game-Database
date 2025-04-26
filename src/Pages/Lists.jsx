import React, { useEffect, useState } from 'react';
import { getUserLists, saveUserLists } from '../utils/listStorage'; // or Firestore functions
import { Link } from 'react-router-dom';

function Lists({ username }) {
  const [userLists, setUserLists] = useState({
    favorites: [],
    playing: [],
    completed: [],
    wishlist: [],
    played: []
  });

  useEffect(() => {
    async function fetchLists() {
      const lists = await getUserLists(username);
      if (lists) {
        setUserLists(lists);
      }
    }
    fetchLists();
  }, [username]);

  const handleRemoveFromList = (listType, gameId) => {
    const confirmed = window.confirm("Are you sure you want to remove this game?");
    if (!confirmed) return;
    const updatedList = userLists[listType].filter(game => game.id !== gameId);
    const updatedUserLists = { ...userLists, [listType]: updatedList };
    setUserLists(updatedUserLists);

    // ✅ Optional: Save back to Firestore
    saveUserLists(username, updatedUserLists);
  };

  const listTitles = {
    favorites: "Favorites",
    playing: "Playing",
    completed: "Completed",
    wishlist: "Wishlist",
    played: "Played"
  };

  return (
    <div className="p-6">
      {/* Back to Home Button */}
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-blue-400 dark:text-white">My Lists</h1>

      {/* Display all lists */}
      {Object.keys(userLists).map((listType) => (
        <div key={listType} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black-400 dark:text-white-300">
            {listTitles[listType]}
          </h2>

          {userLists[listType].length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userLists[listType].map((game) => (
                <div key={game.id} className="bg-slate-700 text-white rounded p-4 relative">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="rounded mb-2 h-[100px] object-cover w-full"
                  />
                  <h2 className="text-lg font-semibold">{game.name}</h2>

                  <button
                    onClick={() => handleRemoveFromList(listType, game.id)}
                    className="absolute top-2 right-2 text-sm bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No games in {listTitles[listType]} list.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Lists;
