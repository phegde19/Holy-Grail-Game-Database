import React, { useEffect, useState, useContext } from "react";
import GenreList from "../components/GenreList";
import WelcomePage from "../components/WelcomePage";
import GlobalApi from "../Services/GlobalApi";
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
    getGameListByGenre(4);
  }, []);

  const getALLGamesList = () => {
    GlobalApi.getAllGames.then((resp) => {
      setAllGameList(resp.data.results);
    });
  };

  const getGameListByGenre = (id) => {
    GlobalApi.getGameListByGenre(id).then((resp) => {
      setGameListByGenre(resp.data.results);
    });
  };

  const getSearchResults = (name) => {
    GlobalApi.searchGame(name).then((resp) => {
      setSearchResults(resp.data.results);
    });
  }

  return (
    <div>
       <Header onSearchResults={(onSearchResults) => getSearchResults(onSearchResults)}/>
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
          <DisplaySearch gameList={allGameList}
          results={searchResults} 
          />
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
