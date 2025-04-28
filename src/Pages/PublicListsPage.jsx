// src/Pages/PublicListsPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const PublicListsPage = () => {
  const [publicLists, setPublicLists] = useState([]);

  useEffect(() => {
    const fetchPublicLists = async () => {
      try {
        const q = query(collection(db, 'userLists'), where('public', '==', true));
        const snapshot = await getDocs(q);
        const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPublicLists(lists);
      } catch (err) {
        console.error('Failed to fetch public lists:', err);
      }
    };

    fetchPublicLists();
  }, []);

  return (
    <div className="p-6">
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Public Game Lists</h1>
      {publicLists.length === 0 ? (
        <p className="text-gray-400">No public lists available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicLists.map((list) => (
            <div key={list.id} className="bg-gray-800 text-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{list.username} — {list.listType}</h2>
              <ul className="list-disc pl-5">
                {list.games?.map((game, idx) => (
                  <li key={idx}>{game.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicListsPage;
