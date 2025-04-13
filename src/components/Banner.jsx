import React, { useEffect } from "react";

function Banner({ gameBanner }) {
  useEffect(() => {}, []);

  // ✅ Return nothing if gameBanner hasn't loaded yet
  if (!gameBanner) return null;

  return (
    <div className="relative">
      <div className="absolute bottom-0 p-5 bg-gradient-to-t from-slate-900 to-transparent w-full rounded-xl px-3">
        <h2 className="text-[24px] text-white font-bold">{gameBanner.name}</h2>
        <button className="fill-blue-700 text-white px-2 p-1">Get Now</button>
      </div>
      <img
        src={gameBanner.background_image}
        className="md:h-[400px] w-full object-cover rounded-xl"
        alt={gameBanner.name}
      />
    </div>
  );
}

export default Banner;
