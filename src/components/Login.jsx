import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, 'users', username);
    const userSnap = await getDoc(userRef);

    if (isLoginMode) {
      // LOGIN
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.password === password) {
          onLogin(username); // Successful login
        } else {
          alert('Incorrect password.');
        }
      } else {
        alert('User does not exist.');
      }
    } else {
      // SIGN UP
      if (userSnap.exists()) {
        alert('Username already taken.');
      } else {
        await setDoc(userRef, {
          password,
          favorites: [],
          playing: [],
          completed: [],
          wishlist: [],
          played: []
        });
        onLogin(username); // Successful signup
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          {isLoginMode ? 'Log In' : 'Sign Up'}
        </button>

        <div
          className="text-center mt-4 text-blue-600 hover:underline cursor-pointer"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
        </div>
      </form>
    </div>
  );
}

export default Login;
