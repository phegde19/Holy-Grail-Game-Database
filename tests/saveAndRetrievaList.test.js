
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../src/firebaseConfig.js';

describe('Integration Test: Save and Retrieve User List', () => {
  let db;

  beforeAll(() => {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  });

  it('should save a game to favorites and retrieve it', async () => {
    const userRef = doc(db, 'users', 'testUser');
    const testData = {
      lists: {
        favorites: [{ id: 123, name: 'FIFA 22' }],
      },
    };

    await setDoc(userRef, testData);

    const docSnap = await getDoc(userRef);
    expect(docSnap.exists()).toBe(true);
    const data = docSnap.data();
    expect(data.lists.favorites[0].name).toBe('FIFA 22');
  });
});
