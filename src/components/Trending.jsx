import React, { useEffect, useState } from 'react';
import { getTrendingGames } from '../Services/GameAPI';

function Trending() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingGames();
      setGameList(data);
    };

    fetchTrending();
  }, []);

  return (
    <div className='mt-5 hidden md:block'>
      <h2 className='font-bold text-[30px] dark:text-white'>Trending Games</h2>
      <div className='md:grid md:grid-cols-3 gap-4 mt-5 lg:grid-cols-4'>
        {gameList.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className='bg-slate-500 rounded-lg group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer'
          >
            <img
              src={item.background_image}
              alt={item.name}
              className='h-[270px] w-full rounded-t-lg object-cover'
            />
            <h2 className='text-[20px] font-bold p-2 dark:text-white'>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
