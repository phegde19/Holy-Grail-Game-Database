import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Reviews({ username }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    gameName: '',
    reviewText: '',
    rating: 5,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'reviews'));
      const reviewList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewList);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.gameName || !newReview.reviewText) {
      alert('Please complete all fields.');
      return;
    }
    try {
      await addDoc(collection(db, 'reviews'), {
        ...newReview,
        username,
        timestamp: serverTimestamp(),
      });
      setNewReview({ gameName: '', reviewText: '', rating: 5 });
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div className="p-6">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6 inline-block">
        ← Home
      </Link>
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Game Reviews</h1>

      {/* Submit New Review */}
      <form onSubmit={handleSubmit} className="mb-10">
        <input
          type="text"
          placeholder="Game Name"
          value={newReview.gameName}
          onChange={(e) => setNewReview({ ...newReview, gameName: e.target.value })}
          className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <textarea
          placeholder="Write your review..."
          value={newReview.reviewText}
          onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
          className="w-full p-2 mb-3 rounded border h-32 dark:bg-gray-700 dark:text-white"
        />
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          className="p-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} Stars
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
        >
          Submit Review
        </button>
      </form>

      {/* Display All Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 text-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{review.gameName}</h2>
            <p className="text-sm text-gray-400 mb-2">by {review.username}</p>
            <p className="mb-2">{review.reviewText}</p>
            <div className="flex items-center gap-1 text-yellow-400">
              {Array(review.rating).fill(0).map((_, idx) => (
                <span key={idx}>⭐</span>
              ))}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
