import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiQueueList } from "react-icons/hi2";
import { GiMoonBats, GiBarbedSun } from "react-icons/gi";
import { ThemeContext } from "../Context/ThemeContext";
import placeholder from "../assets/Images/placeholder-logo.jpg";
import { HiMenu } from "react-icons/hi";
import { VisibilityContext } from "../Context/VisibilityContext";
import { searchGames } from "../Services/GameAPI";

function Header({onSearchResults}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { toggleVisibility } = useContext(VisibilityContext);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    console.log("VisibleToggle");
  }, []);
  
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  
    if (searchValue.length > 2) {
      searchGames(searchValue).then((results) => {
        onSearchResults(results); // results = response.data.results already
      });
    } else {
      onSearchResults([]);
    }
  };
  

  return (
    <div className="w-full items-center p-3 flex">
      <HiMenu 
        className="text-[35px] cursor-pointer mr-3 dark:bg-slate-200 rounded-full p-1"
        onClick={toggleVisibility}
        />
          <div className="flex p-2 w-full mx-5 rounded-full items-center bg-gray-200 dark:bg-white shadow-md">
          <HiOutlineMagnifyingGlass className="text-gray-600 dark:text-black" />
          <form
              onSubmit={(e) => {
              e.preventDefault();
            if (searchValue.length > 2) {
              onSearchResults(searchValue);
            } else {
              onSearchResults([]);
            }
          }}
          className="w-full">
          <input
            type="text"
            placeholder="Search Games"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-2 py-1 bg-transparent text-black dark:text-black placeholder-gray-500 outline-none"
          />
        </form>
      </div>
      <div>
        {theme == "light" ? (
          <GiMoonBats 
            className="text-[35px] bg-slate-200
            text-black p-1 rounded-full cursor-pointer"
            onClick={() => {
              setTheme("dark");
              localStorage.setItem("theme", "dark");
            }} 
          /> 
        ) : (
          <GiBarbedSun
            className="text-[35px] bg-slate-200 text-black 
            p-1 rounded-full cursor-pointer"
            onClick={() => {
              setTheme("light");
              localStorage.setItem("theme", "light");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
