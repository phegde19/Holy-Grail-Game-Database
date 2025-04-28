import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';


export const saveProfileToFirestore = async (username, profileData) => {
  try {
    await setDoc(doc(db, 'userProfiles', username), profileData);
    console.log('Saved profile to Firestore:', profileData);
  } catch (error) {
    console.error('Failed to save profile to Firestore:', error);
  }
};


export const getUserProfile = (username) => {
  const saved = localStorage.getItem(`${username}_profile`);
  let parsed = {};
  try {
    parsed = saved ? JSON.parse(saved) : {};
  } catch {
    parsed = {};
  }

  return {
    email: parsed.email || '',
    bio: parsed.bio || '',
    location: parsed.location || '',
  };
};


export const saveProfileLocally = (username, profileData) => {
  localStorage.setItem(`${username}_profile`, JSON.stringify(profileData));
};
