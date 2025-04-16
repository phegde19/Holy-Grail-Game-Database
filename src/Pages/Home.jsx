import React, { useEffect, useState, useContext } from 'react';
import GenreList from '../components/GenreList';
import WelcomePage from '../components/WelcomePage';
import Banner from '../components/Banner';
import Trending from '../components/Trending';
import DisplaySearch from '../components/DisplaySearch';
import Header from '../components/Header';
import { VisibilityContext } from '../Context/VisibilityContext';
import { getTrendingGames, searchGames, getGamesByGenre } from '../Services/GameAPI';
import { getUserLists, saveUserLists } from '../utils/listStorage';

export default function Home({ username, onLogout }) {
  const [searchResults, setSearchResults] = useState([]);
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenre, setGameListByGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("null");
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

  const handleAddToList = (game, listType) => {
    const lists = getUserLists(username);
    if (!lists[listType]) {
      console.error('List type does not exist:', listType);
      return;
    }
    if (!lists[listType].some((g) => g.id === game.id)) {
      lists[listType].push(game);
      saveUserLists(username, lists);
      alert(`${game.name} added to ${listType.charAt(0).toUpperCase() + listType.slice(1)}`);
    } else {
      alert(`${game.name} is already in your ${listType}`);
    }
  };

  return (
    <div>
      <Header
        user={username}
        onSearchResults={getSearchResults}
        onLogout={onLogout}
      />

      <div className={`grid ${visible ? 'grid-cols-4' : 'grid-cols-1'}`}>
        {visible && (
          <div className="h-full px-2 hidden md:block">
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
            <DisplaySearch
              gameList={searchResults}
              selectedGenre={null}
              onAddToList={handleAddToList}
            />
          ) : gameListByGenre.length > 0 ? (
            <DisplaySearch
              gameList={gameListByGenre}
              selectedGenre={selectedGenre}
              onAddToList={handleAddToList}
            />
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
