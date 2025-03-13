import React, { useContext } from 'react';
import { HiQueueList } from 'react-icons/hi2';
import { VisibilityContext } from './VisibilityContext';

const Sidebar = () => {
  const { toggleVisibility } = useContext(VisibilityContext);

  return (
    <HiQueueList
      onClick={toggleVisibility}
      className='px-1 text-[45px] cursor-pointer hover:bg-gray-300 rounded-full p-2 dark:bg-white'
    />
  );
};

export default Sidebar;