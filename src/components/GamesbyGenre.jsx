import React, { useEffect, useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { CiChat2 } from "react-icons/ci";
import { FiThumbsUp } from "react-icons/fi";
import { getGamesByGenre } from '../Services/GameAPI';

function GamesbyGenre({ selectedGenre }) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      if (!selectedGenre) return;
      const data = await getGamesByGenre(selectedGenre);
      setGameList(data);
    };

    fetchGames();
  }, [selectedGenre]);

  return (
    <div>
      <h2 className='font-bold text-[30px] dark:text-white mt-5'>{selectedGenre.toUpperCase()} Games</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
        {gameList.map((item) => (
          <div
            key={item.id}
            className='bg-slate-500 p-2 rounded-xl group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer h-full'
          >
            <img
              src={item.background_image}
              alt={item.name}
              className='w-full h-[80%] object-cover rounded-xl'
            />
            <h2 className='text-[20px] font-bold dark:text-white px-2'>
              {item.name}
              <span className='ml-2 text-xs bg-green-100 text-green-700 px-1 rounded-sm'>
                {item.metacritic}
              </span>
            </h2>
            <h2 className='flex gap-4 dark:text-gray-200 text-gray-900 px-2 pb-2'>
              <FaRegStar /> {item.rating}
              <CiChat2 /> {item.reviews_count}
              <FiThumbsUp /> {item.suggestions_count}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesbyGenre;
