import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

function AccountDropdown({ username = 'User', onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-white text-2xl focus:outline-none"
      >
        <FaUserCircle />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-50">
          <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-gray-200 border-b">
            {username}
          </div>
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Lists</li>
            <li
              onClick={onLogout}
              className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer text-red-600 dark:text-red-400"
            >
              Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
