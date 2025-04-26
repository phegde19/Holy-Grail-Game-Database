import React, { useEffect, useState } from 'react';
import { getUserLists, saveUserLists, saveListToFirestore } from '../utils/listStorage';
import { Link } from 'react-router-dom';

function Lists({ username }) {
  const [userLists, setUserLists] = useState({
    favorites: [],
    playing: [],
    completed: [],
    wishlist: [],
    played: []
  });
  const [listPublicFlags, setListPublicFlags] = useState({}); // Track public/private per list

  useEffect(() => {
    async function fetchLists() {
      const lists = await getUserLists(username);
      setUserLists(lists);
    }
    fetchLists();
  }, [username]);

  const handleRemoveFromList = (listType, gameId) => {
    const confirmed = window.confirm("Are you sure you want to remove this game from your list?");
    if (!confirmed) return;

    const updatedList = userLists[listType].filter(game => game.id !== gameId);
    const updatedUserLists = { ...userLists, [listType]: updatedList };
    setUserLists(updatedUserLists);
    saveUserLists(username, updatedUserLists); // Save locally

    // If list was public, also update Firestore
    if (listPublicFlags[listType]) {
      saveListToFirestore(username, listType, updatedList, true);
    }
  };

  const handleTogglePublic = async (listType) => {
    const newPublicFlags = { ...listPublicFlags, [listType]: !listPublicFlags[listType] };
    setListPublicFlags(newPublicFlags);

    const isPublic = !listPublicFlags[listType];
    const games = userLists[listType];

    // Save this list with updated public/private flag
    await saveListToFirestore(username, listType, games, isPublic);
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-green-400 dark:text-green-300">
              {listTitles[listType]}
            </h2>
            {/* Toggle Public/Private */}
            <button
              onClick={() => handleTogglePublic(listType)}
              className={`px-3 py-1 rounded ${
                listPublicFlags[listType]
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              } text-white text-sm`}
            >
              {listPublicFlags[listType] ? 'Public' : 'Private'}
            </button>
          </div>

          {userLists[listType].length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userLists[listType].map((game) => (
                <div key={game.id} className="bg-slate-700 text-white rounded p-4 relative">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="rounded mb-2 h-[150px] object-cover w-full"
                  />
                  <h2 className="text-base font-semibold">{game.name}</h2>

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
