import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import placeholder from '../assets/Images/placeholder-logo.jpg'; // ✅ Import image

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, 'users', username);
    const userSnap = await getDoc(userRef);

    if (isLoginMode) {
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.password === password) {
          onLogin(username);
        } else {
          alert('Incorrect password.');
        }
      } else {
        alert('User does not exist.');
      }
    } else {
      if (userSnap.exists()) {
        alert('Username already taken.');
      } else {
        await setDoc(userRef, {
          password,
          favorites: [],
          playing: [],
          completed: [],
          wishlist: [],
          played: [],
        });
        onLogin(username);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 dark:bg-[#121212] p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
            {isLoginMode ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
            {isLoginMode ? 'Please log in to continue' : 'Sign up to get started'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-white outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
            >
              {isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div
            className="mt-4 text-center text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block w-1/2">
        <img
          src={placeholder}
          alt="Placeholder"
          className="w-full h-full object-contain mx-auto my-auto p-8"
        />
      </div>
    </div>
  );
}

export default Login;
