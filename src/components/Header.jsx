import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiQueueList } from "react-icons/hi2";
import { GiMoonBats, GiBarbedSun } from "react-icons/gi";
import { ThemeContext } from "../Context/ThemeContext";
import placeholder from "../assets/Images/placeholder-logo.jpg";
import { HiMenu } from "react-icons/hi";
import { VisibilityContext } from "../Context/VisibilityContext";
import GlobalApi from "../Services/GlobalApi";

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
      GlobalApi.searchGame(searchValue).then((resp) => {
        onSearchResults(resp.data.results); 
  });
    } else {
      onSearchResults([]); // Clear results if search value is less than 3 characters
    }
  };

  return (
    <div className="w-full items-center p-3 flex">
      <HiMenu 
        className="text-[35px] cursor-pointer mr-3 dark:bg-slate-200 rounded-full p-1"
        onClick={toggleVisibility}
        />
      <div
        className="flex bg-slate-200 p-2 w-screen 
        mx-5 rounded-full items-center">
        <HiOutlineMagnifyingGlass />
        <input
          type="text"
          placeholder="Search Games"
          value={searchValue}
          onChange={handleSearch}
          className="px-2 dark:bg-transparent outline-none"
        />
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
