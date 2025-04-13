import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiQueueList } from "react-icons/hi2";
import { GiMoonBats, GiBarbedSun } from "react-icons/gi";
import { ThemeContext } from "../Context/ThemeContext";
import placeholder from "../assets/Images/placeholder-logo.jpg";
import { HiMenu } from "react-icons/hi";
import { VisibilityContext } from "../Context/VisibilityContext";
import { searchGames } from "../Services/GameAPI";
import { FaUserCircle } from "react-icons/fa";

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
  
    if (searchValue.trim().length > 2) {
      searchGames(searchValue.trim()).then((results) => {
        onSearchResults(results); // results = response.data.results already
      }).catch((err) => {
        console.error("Search failed:", err.message);
      });
    } else {
      onSearchResults([]);
    }
  };
  

  return (
    <div className="relative w-full p-3">
  {/* Menu + Search Bar */}
  <div className="flex items-center max-w-[600px]">
    <HiMenu 
      className="text-[30px] cursor-pointer mr-3 dark:bg-slate-200 rounded-full p-1"
      onClick={toggleVisibility}
    />
    <div className="flex bg-slate-200 p-2 w-full rounded-full items-center">
      <HiOutlineMagnifyingGlass />
      <input
        type="text"
        placeholder="Search Games"
        value={searchValue}
        onChange={handleSearch}
        className="px-2 dark:bg-transparent outline-none w-full"
      />
    </div>
  </div>

  {/* Theme toggle - fixed offset from right */}
  <div className="absolute top-5 right-20">
    {theme === "light" ? (
      <GiMoonBats
        className="text-[30px] bg-slate-200 text-black p-1 rounded-full cursor-pointer"
        onClick={() => {
          setTheme("dark");
          localStorage.setItem("theme", "dark");
        }}
      />
    ) : (
      <GiBarbedSun
        className="text-[30px] bg-slate-200 text-black p-1 rounded-full cursor-pointer"
        onClick={() => {
          setTheme("light");
          localStorage.setItem("theme", "light");
        }}
      />
    )}
  </div>

  {/* Account icon - fixed far right */}
  <div className="absolute top-1 right-4">
    <FaUserCircle className="text-[30px] text-white cursor-pointer" />
  </div>
</div>




  );
}

export default Header;
