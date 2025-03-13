import React, { useEffect, useState } from 'react'
import GenreList from '../components/GenreList'
import WelcomePage from '../components/WelcomePage'
import GlobalApi from '../Services/GlobalApi';
import Banner from '../components/Banner';

export default function Home() {
  const [allGameList, setAllGameList] = useState([]);
  useEffect(() => {
    getALLGamesList();
  }, [])

  const getALLGamesList = () => {
    GlobalApi.getAllGames.then((resp) =>{ 
      setAllGameList(resp.data.results);
    })
  }
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-4 text-center py-2'>
        <WelcomePage/>
      </div>
      <div className='h-full px-2'>
        <GenreList/>
      </div>
      <div className='col-span-4 md:col-span-3'>
        {allGameList?.length > 0?
        <Banner gameBanner={allGameList[0]}/>
        :null }
      </div>
    </div>
  )
}
