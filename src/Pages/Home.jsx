import React, { useEffect, useState, useContext } from "react";
import GenreList from "../components/GenreList";
import WelcomePage from "../components/WelcomePage";
import { searchGames, getTrendingGames, getGamesByGenre } from "../Services/GameAPI";
import Banner from "../components/Banner";
import Trending from "../components/Trending";
import { VisibilityContext } from "../Context/VisibilityContext";
import GamesbyGenre from "../components/GamesbyGenre";
import DisplaySearch from "../components/DisplaySearch";
import Header from "../components/Header";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [allGameList, setAllGameList] = useState([]);
  const { visible } = useContext(VisibilityContext);
  const [gameListByGenre, setGameListByGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Action");
  useEffect(() => {}, []);
  useEffect(() => {
    getALLGamesList();
    getGameListByGenre("action");
  }, []);

  const getALLGamesList = async () => {
    const results = await getTrendingGames(); // RAWG doesn't have "all games", trending is good here
    setAllGameList(results);
  };

  const getGameListByGenre = async (slug) => {
    const results = await getGamesByGenre(slug); // RAWG expects slug, like "action", not id like 4
    setGameListByGenre(results);
  };

  const getSearchResults = async (name) => {
    if (name.length > 2) {
      const results = await searchGames(name);
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results if fewer than 3 characters
    }
  };  

  return (
    <div>
       <Header onSearchResults={getSearchResults} />
    <div className={`grid ${visible ? "grid-cols-4" : "grid-cols-1"}`}>
      {visible && (
        <div className="h-full px-2 hidden md:block">
          <GenreList
            genreId={(genreId) => getGameListByGenre(genreId)}
            selectedGenre={(name) => setSelectedGenre(name)}
          />
        </div>
      )}
      <div className={`${visible ? "col-span-3" : "col-span-1"}`}>
        <div className="text-center py-2">
          <WelcomePage />
        </div>
        {searchResults.length > 0 ? (
          <DisplaySearch gameList={searchResults}/>
        ) : allGameList?.length > 0 && gameListByGenre.length > 0 ? (
          <div>
            <Banner gameBanner={allGameList[0]} />
            <Trending gameList={allGameList} />
            <GamesbyGenre
              gameList={gameListByGenre}
              selectedGenre={selectedGenre}
            />
          </div>
        ) : null}
      </div>
    </div>
    </div>
  );
}
