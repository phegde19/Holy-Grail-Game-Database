import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiQueueList } from "react-icons/hi2";
import { GiMoonBats, GiBarbedSun } from "react-icons/gi";
import { ThemeContext } from "../Context/ThemeContext";
import placeholder from "../assets/Images/placeholder-logo.jpg";

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  useEffect(() => {
    console.log("Theme", theme);
  }, []);
  
  return (
    <div className="w-full items-center p-3 flex">
      <img src={placeholder} className="w-[50px] h-[50px] rounded-full" /> 
      <div
        className="flex bg-slate-200 p-2 w-screen 
        mx-5 rounded-full items-center">
        <HiOutlineMagnifyingGlass />
        <input
          type="text"
          placeholder="Search Games"
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
