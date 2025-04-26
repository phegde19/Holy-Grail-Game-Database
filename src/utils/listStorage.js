import { db } from '../firebase'; // Adjust the path if needed
import { doc, setDoc } from 'firebase/firestore';

// Load user's lists from localStorage
export const getUserLists = (username) => {
  const saved = localStorage.getItem(`${username}_lists`);
  const defaultLists = {
    favorites: [],
    wishlist: [],
    played: [],
    playing: [],
    completed: [],
  };

  let parsed = {};
  try {
    parsed = saved ? JSON.parse(saved) : {};
  } catch {
    parsed = {};
  }

  return { ...defaultLists, ...parsed };
};

// Save user's lists to localStorage
export const saveUserLists = (username, lists) => {
  localStorage.setItem(`${username}_lists`, JSON.stringify(lists));
};

// 🔥 NEW: Save a specific list to Firestore
export const saveListToFirestore = async (username, listType, games, publicFlag = false) => {
  try {
    await setDoc(doc(db, 'userLists', `${username}_${listType}`), {
      username,
      listType,
      public: publicFlag,
      games,
    });
    console.log(`Saved ${listType} list for ${username} to Firestore.`);
  } catch (error) {
    console.error('Failed to save list to Firestore:', error);
  }
};
