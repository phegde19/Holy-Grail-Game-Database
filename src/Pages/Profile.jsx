import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const [profileData, setProfileData] = useState({
    email: '',
    bio: '',
    location: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Profile:", profileData);
    alert("Profile saved!");
    // Here you'd typically POST this to your backend or localStorage
  };

  return (
    <div className="p-6 text-gray-900 dark:text-white max-w-xl mx-auto">
        <button
            onClick={() =>navigate('/')}
            className="mb-6 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        ← Back to Home
      </button>
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={user}
            disabled
            className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="City, Country"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;
