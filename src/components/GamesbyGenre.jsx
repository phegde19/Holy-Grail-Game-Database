import React, { useEffect } from 'react'
import { FaRegStar } from "react-icons/fa";
import { CiChat2 } from "react-icons/ci";
import { FiThumbsUp } from "react-icons/fi";



function GamesbyGenre({gameList, selectedGenre}) {
    useEffect(() => {
        console.log("GameList",gameList);
    },[])
  return (
    <div>
        <h2 className='font-bold text-[30px] dark:text-white mt-5'>{selectedGenre} games</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-6 mt-5'>
            {gameList.map((item)=>(
                <div className='bg-slate-500 p-2 rounded-xl group 
                    hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer h-full'>
                    <img src={item.background_image} className='w-full h-[80%] object-cover rounded-xl'/>
                    <h2 className='text-[20px] font-bold dark:text-white px-2'>{item.name}
                        <span className='rounded-sm ml-2 text[5px] bg-green-100 text-green-700 font-medium'>{item.metacritic}</span></h2>
                    <h2 className='flex gap-4 dark:text-gray-200 text-gray-900'> <FaRegStar/>{item.rating} <CiChat2/>{item.reviews_count}<FiThumbsUp/>{item.suggestions_count}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GamesbyGenre