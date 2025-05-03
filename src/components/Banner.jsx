import React, { useEffect } from "react";

function Banner({ gameBanner, inAddToList }) {
  useEffect(() => {}, []);

  //Return nothing if gameBanner hasn't loaded yet
  if (!gameBanner) return null;

  const unwantedTags = ['Nudity', 'Sexual Content'];
  const hasUnwantedTags = gameBanner.tags?.some((tag) => unwantedTags.includes(tag.name));

  if(hasUnwantedTags) return null;

  return (
    <div className="relative">
      <div className="absolute bottom-0 p-5 bg-gradient-to-t from-slate-900 to-transparent w-full rounded-xl px-5">
        <h2 className="text-[24px] text-white font-bold">{gameBanner.name}</h2>
        <select
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                if (e.target.value !== '') {
                  onAddToList(gameBanner, e.target.value);
                  e.target.selectedIndex = 0; // reset dropdown
                }
              }}
              className="m-2 p-1 text-sm rounded bg-white dark:bg-gray-600 text-black dark:text-white border"
              defaultValue=""
            >
              <option value="" disabled>+ Add to List</option>
              <option value="favorites">Favorites</option>
              <option value="playing">Playing</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
              <option value="played">Played</option>
            </select>
      </div>
      <img
        src={gameBanner.background_image}
        className="md:h-[400px] w-full object-center rounded-xl"
        alt={gameBanner.name}
      />
    </div>
  );
}

export default Banner;
