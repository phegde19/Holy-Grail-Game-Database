import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

// Create a new thread
export const createThread = async (title, content, username) => {
  await addDoc(collection(db, 'threads'), {
    title,
    content,
    author: username,
    timestamp: serverTimestamp(),
    replies: []
  });
};

// Fetch all threads
export const fetchThreads = async () => {
  const snapshot = await getDocs(collection(db, 'threads'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a reply to a thread
export const addReply = async (threadId, content, username) => {
  const threadRef = doc(db, 'threads', threadId);
  await updateDoc(threadRef, {
    replies: arrayUnion({
      username,
      content,
      createdAt: new Date().toISOString()
    })
  });
;}

