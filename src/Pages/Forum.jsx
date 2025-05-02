// written by: Pritam Hegde
// tested by: Pritam Hegde
// debugged by: Pritam Hegde
import React, { useState, useEffect } from 'react';
import { createThread, fetchThreads, addReply } from '../Services/ForumService'; 
import { Link } from 'react-router-dom';

function Forum({ username }) {
  const [threads, setThreads] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [replyContent, setReplyContent] = useState({}); // Dynamic reply for each thread

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    const allThreads = await fetchThreads();
    setThreads(allThreads);
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }
    await createThread(newTitle, newContent, username);
    setNewTitle('');
    setNewContent('');
    loadThreads(); // Refresh threads
  };

  const handleAddReply = async (threadId) => {
    if (!replyContent[threadId] || replyContent[threadId].trim() === '') {
      alert('Reply cannot be empty.');
      return;
    }
    await addReply(threadId, replyContent[threadId], username);
    setReplyContent({ ...replyContent, [threadId]: '' }); // Clear after reply
    loadThreads(); // Refresh threads
  };

  return (
    <div className="p-6">
      {/* Home */}
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6 inline-block">
        ← Home
      </Link>

      {/* Create New Thread */}
      <h1 className="text-3xl font-bold mb-6 text-blue-400 dark:text-white">Community Forum</h1>

      <form onSubmit={handleCreateThread} className="mb-8">
        <input
          type="text"
          placeholder="Thread Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <textarea
          placeholder="Thread Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-white h-24"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Thread
        </button>
      </form>

      {/* List of Threads */}
      {threads.length > 0 ? (
        threads.map((thread) => (
          <div key={thread.id} className="bg-slate-700 text-white rounded p-4 mb-6">
            <h2 className="text-2xl font-semibold">{thread.title}</h2>
            <p className="text-gray-300 mt-2">{thread.content}</p>
            <p className="text-sm text-gray-400 mt-1">Posted by {thread.author}</p>

            {/* Replies */}
            <div className="mt-4">
              <h3 className="text-xl mb-2 text-green-400">Replies:</h3>
              {thread.replies && thread.replies.length > 0 ? (
                thread.replies.map((reply, index) => (
                  <div key={index} className="bg-gray-600 p-2 rounded mb-2">
                    <p>{reply.content}</p>
                    <p className="text-sm text-gray-300">- {reply.username}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No replies yet.</p>
              )}
            </div>

            {/* Add Reply */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyContent[thread.id] || ''}
                onChange={(e) => setReplyContent({ ...replyContent, [thread.id]: e.target.value })}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white mb-2"
              />
              <button
                onClick={() => handleAddReply(thread.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Reply
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No threads yet. Start the first one!</p>
      )}
    </div>
  );
}

export default Forum;
