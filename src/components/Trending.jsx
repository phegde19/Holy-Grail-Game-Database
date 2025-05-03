import React, { useEffect, useState, useRef } from "react";
import { getTrendingGames } from "../Services/GameAPI";
import GameModel from "./GameModel";

function Trending({ gameList, onAddToList }) {
  const scrollContainerRef = useRef(null); // Create a ref for the scroll container
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingGames();
      console.log(data);
      setGameList(data);
    };

    fetchTrending();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-5 hidden md:block">
      <h2 className="font-bold text-[30px] dark:text-white text-center">
        Trending Games
      </h2>
      <div className="relative flex items-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 transform -translate-y-1/2 bg-blue-400 text-black
           dark:text-white dark:bg-purple-400 p-2 rounded-full z-10 onhover:text-black"
        >
          ◀
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 transform -translate-y-1/2 bg-blue-400 text-black
           dark:text-white dark:bg-purple-400 p-2 rounded-full z-10 onhover:text-black"
        >
          ▶
        </button>
      </div>
      <div
        ref={scrollContainerRef}
        className="overflow-x-hidden md:grid md:grid-cols-3 gap-4 mt-5 lg:grid-cols-4 py-5 px-2"
        style={{ width: "100%" }}
      >
        <div
          className="flex gap-4 "
          style={{ width: `${gameList.lenth * 300}px`}}
        >
          {gameList
            .filter(
              (item) =>
                !item.tags.some(
                  (tags) =>
                    tags.name === "Nudity" || tags.name === "Sexual Content"
                )
            ) // Filter out unwanted tags
            .map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGameId(item.id)}
                className="bg-gray-400 rounded-xl group hover:scale-110 transition-transform ease-in-out duration-300 cursor-pointer border"
                style={{ 
                  minWidth: "300px", 
                  overflow: "visible",
                }}
              >
                <img
                  src={item.background_image}
                  alt={item.name}
                  className="h-[270px] w-full rounded-t-xl object-cover"
                  style={{transformOrigin: "center"}}
                />
                <h2 className="text-[20px] font-bold p-2 dark:text-white">
                  {item.name}
                </h2>
                <select
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      onAddToList(item, e.target.value);
                      e.target.selectedIndex = 0; // reset dropdown
                    }
                  }}
                  className="m-2 p-1 text-sm rounded bg-white dark:bg-gray-600 text-black dark:text-white border"
                  defaultValue=""
                >
                  <option value="" disabled>
                    + Add to List
                  </option>
                  <option value="favorites">Favorites</option>
                  <option value="playing">Playing</option>
                  <option value="completed">Completed</option>
                  <option value="wishlist">Wishlist</option>
                  <option value="played">Played</option>
                </select>
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
    </div>
  );
}

export default Trending;
