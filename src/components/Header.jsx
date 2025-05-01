import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiQueueList } from "react-icons/hi2";
import { GiMoonBats, GiBarbedSun } from "react-icons/gi";
import { ThemeContext } from "../Context/ThemeContext";
import { HiMenu } from "react-icons/hi";
import { VisibilityContext } from "../Context/VisibilityContext";
import { searchGames } from "../Services/GameAPI";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

function Header({ onSearchResults, user, onLogout }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { toggleVisibility } = useContext(VisibilityContext);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);

    if (searchValue.trim().length > 2) {
      searchGames(searchValue.trim())
        .then((results) => {
          onSearchResults(results);
        })
        .catch((err) => {
          console.error("Search failed:", err.message);
        });
    } else {
      onSearchResults([]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 px-4 py-3 bg-transparent">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <HiMenu
            className="text-[35px] cursor-pointer dark:bg-slate-200 rounded-full p-1"
            onClick={toggleVisibility}
          />
          {/* ✅ Forum Nav Link */}
          <Link
            to="/forum"
            className="text-blue-600 dark:text-purple-400 font-semibold hover:underline"
          >
            Community Forum
          </Link>
          <Link
            to="/recommendations"
            className="text-blue-600 dark:text-purple-400 font-semibold hover:underline"
          >
            Recommended
          </Link>      
          <Link to="/public-lists" className="text-blue-600 dark:text-purple-400 font-semibold px-4 py-2 hover:underline">
            Public Lists
          </Link>
          <Link to="/reviews" className="text-blue-600 dark:text-purple-400 font-semibold hover:text-blue-400">
            Reviews
          </Link>
        </div>

        {/* Theme Toggle + User */}
        <div className="flex items-center gap-4 relative">
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

          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-sm text-gray-700 dark:text-white"
              >
                <HiOutlineUserCircle className="text-2xl" />
                {user}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <ul className="py-1 text-sm">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      <Link to="/profile" className="block w-full text-black dark:text-white">
                        Profile
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      <Link to="/lists" className="block w-full text-black dark:text-white">
                        My Lists
                      </Link>
                    </li>
                    <li
                      onClick={onLogout}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-500"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex p-2 rounded-full items-center bg-gray-200 dark:bg-white shadow-md border">
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
          className="w-full"
        >
          <input
            type="text"
            placeholder="Search Games"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-2 py-1 bg-transparent text-black dark:text-black placeholder-gray-500 outline-none"
          />
        </form>
      </div>
    </div>
  );
}

export default Header;
