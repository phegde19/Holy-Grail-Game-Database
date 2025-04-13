import React, { useState } from 'react';
import GameModel from './GameModel';

function DisplaySearch({ gameList }) {
  const [selectedGameId, setSelectedGameId] = useState(null);

  return (
    <div>
      <h1 className='text-blue-400 dark:text-purple-400 font-bold'>Search Results</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
        {gameList.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedGameId(item.id)}
            className='bg-slate-500 rounded-lg group 
              hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer'
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

      {selectedGameId && (
        <GameModel
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
        />
      )}
    </div>
  );
}

export default DisplaySearch;
