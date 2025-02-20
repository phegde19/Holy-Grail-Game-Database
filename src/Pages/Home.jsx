import React from 'react'
import GenreList from '../components/GenreList'
import WelcomePage from '../components/WelcomePage'

export default function Home() {
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-4 text-center py-2'>
        <WelcomePage/>
      </div>
      <div className='h-full px-2'>
        <GenreList/>
      </div>
      <div className='col-span-4 md:col-span-3 bg-blue-600'>Game List</div>
    </div>
  )
}
