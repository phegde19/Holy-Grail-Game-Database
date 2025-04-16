import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Forum = ({ username }) => {
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('forumThreads');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleCreateThread = () => {
    if (!newTitle.trim() || !newComment.trim()) return;

    const thread = {
      id: Date.now(),
      title: newTitle,
      comments: [
        { text: newComment, user: username, time: new Date().toLocaleString() }
      ],
      createdBy: username,
      createdAt: new Date().toLocaleString()
    };

    const updated = [thread, ...threads];
    setThreads(updated);
    localStorage.setItem('forumThreads', JSON.stringify(updated));
    setNewTitle('');
    setNewComment('');
  };

  const handleAddComment = (threadId, text) => {
    const updated = threads.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          comments: [...thread.comments, {
            text, user: username, time: new Date().toLocaleString()
          }]
        };
      }
      return thread;
    });
    setThreads(updated);
    localStorage.setItem('forumThreads', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
        <button
            onClick={() =>navigate('/')}
            className="mb-6 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        ← Back to Home
      </button>
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Community Forum</h1>

      {/* New Thread */}
      <div className="mb-6 p-4 border rounded shadow bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2">Start a New Thread</h2>
        <input
          type="text"
          placeholder="Thread Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2 dark:text-black"
        />
        <textarea
          placeholder="Initial comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded mb-2 dark:text-black"
        />
        <button
          onClick={handleCreateThread}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Thread
        </button>
      </div>

      {/* Threads List */}
      <div>
        {threads.map(thread => (
          <div key={thread.id} className="mb-4 p-4 border rounded bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-purple-500">{thread.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">By {thread.createdBy} • {thread.createdAt}</p>

            <div className="mt-3">
              {thread.comments.map((comment, i) => (
                <div key={i} className="mb-2">
                  <p className="dark:text-white">{comment.text}</p>
                  <small className="text-gray-500">– {comment.user} at {comment.time}</small>
                </div>
              ))}
              <input
                type="text"
                placeholder="Reply..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(thread.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-2 border rounded mt-2 dark:text-black"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
