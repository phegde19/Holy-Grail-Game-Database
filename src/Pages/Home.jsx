import React, { useEffect, useState, useContext } from 'react';
import GenreList from '../components/GenreList';
import WelcomePage from '../components/WelcomePage';
import Banner from '../components/Banner';
import Trending from '../components/Trending';
import DisplaySearch from '../components/DisplaySearch';
import Header from '../components/Header';
import { VisibilityContext } from '../Context/VisibilityContext';
import { getTrendingGames, searchGames, getGamesByGenre } from '../Services/GameAPI';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenre, setGameListByGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { visible } = useContext(VisibilityContext);

  useEffect(() => {
    getAllGames();
    getGameListByGenre('action');
    setSelectedGenre('action');
  }, []);

  const getAllGames = async () => {
    const games = await getTrendingGames();
    setAllGameList(games);
  };

  const getGameListByGenre = async (slug) => {
    const games = await getGamesByGenre(slug);
    setGameListByGenre(games);
  };

  const handleGenreSelect = (slug) => {
    setSelectedGenre(slug);
    getGameListByGenre(slug);
    setSearchResults([]);
  };

  const getSearchResults = async (query) => {
    if (query.length > 2) {
      const results = await searchGames(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Header onSearchResults={getSearchResults} />
      <div className={`grid ${visible ? 'grid-cols-4' : 'grid-cols-1'}`}>
        {visible && (
          <div className="px-2 hidden md:block">
            <GenreList
              onGenreSelect={handleGenreSelect}
              selectedGenre={selectedGenre}
            />
          </div>
        )}
        <div className={`${visible ? 'col-span-3' : 'col-span-1'}`}>
          <div className="text-center py-2">
            <WelcomePage />
          </div>

          {searchResults.length > 0 ? (
            <DisplaySearch gameList={searchResults} selectedGenre={null} />
          ) : gameListByGenre.length > 0 ? (
            <DisplaySearch gameList={gameListByGenre} selectedGenre={selectedGenre} />
          ) : (
            <div>
              <Banner gameBanner={allGameList[0]} />
              <Trending gameList={allGameList} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
