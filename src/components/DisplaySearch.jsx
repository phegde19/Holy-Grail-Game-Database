import React, { useState } from 'react';
import { searchGames } from '../Services/GameAPI'; // This is where your API logic lives

function DisplaySearch() {
  const [query, setQuery] = useState('');
  const [gameList, setGameList] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    const results = await searchGames(query);
    setGameList(results);
  };

  return (
    <div className='px-4 md:px-8 lg:px-16'>
      <form onSubmit={handleSearch} className='flex justify-center mb-8'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for a game...'
          className='border-2 border-gray-300 p-2 rounded-l-md w-full max-w-md'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600'
        >
          Search
        </button>
      </form>

      {gameList.length > 0 && (
        <div>
          <h1 className='text-blue-400 dark:text-purple-400 font-bold'>
            Search Results
          </h1>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
            {gameList.map((item) => (
              <div
                key={item.id}
                className='bg-slate-500 rounded-lg group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer'
              >
                <img
                  src={item.background_image}
                  alt={item.name}
                  className='w-full h-[270px] object-cover rounded-xl'
                />
                <h2 className='text-[20px] font-bold p-2 dark:text-white'>
                  {item.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplaySearch;
