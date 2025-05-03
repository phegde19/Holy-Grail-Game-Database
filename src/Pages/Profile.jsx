// written by: Pritam Hegde
// tested by: Pritam Hegde
// debugged by: Pritam Hegde
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { getUserProfile, saveProfileToFirestore, saveProfileLocally } from '../utils/profileStorage';



function Profile({ user }) {
  const [profileData, setProfileData] = useState({
    email: '',
    bio: '',
    location: '',
  });
  const navigate = useNavigate();

  
  useEffect(() => {
    const savedProfile = getUserProfile(user);
    setProfileData(savedProfile);
  }, [user]);

  
  const handleSave = () => {
    saveUserProfile(user, profileData);
    saveProfileToFirestore(user, profileData);
    alert('Profile saved successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Edit Profile</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Bio"
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={profileData.location}
          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
          className="p-2 border rounded"
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Save Profile
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-gray-400 hover:bg-gray-500 text-white py-2 rounded font-semibold"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Profile;
