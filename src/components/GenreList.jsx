import React, { useEffect, useState } from 'react';
import { getGenres } from '../Services/GameAPI';

function GenreList({ onGenreSelect, selectedGenre }) {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getGenres().then(setGenreList);
  }, []);

  return (
    <div>
      <h2 className="text-[30px] font-bold dark:text-white mb-4">Genre</h2>
      {genreList.map((genre) => (
        <div
          key={genre.id}
          onClick={() => onGenreSelect(genre.slug)}
          className={`flex gap-2 items-center mb-2 cursor-pointer p-3 rounded-lg transition-all ${
            selectedGenre === genre.slug ? 'bg-gray-400 dark:bg-gray-700' : ''
          }`}
        >
          <img
            src={genre.image_background}
            className="w-[50px] h-[50px] object-cover rounded"
          />
          <p className={`text-lg font-medium dark:text-white`}>
            {genre.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GenreList;
