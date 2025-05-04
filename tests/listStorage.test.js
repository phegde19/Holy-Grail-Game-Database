import { getUserLists, saveUserLists } from '../src/utils/listStorage.js';

describe('List Storage Tests', () => {
  const testUser = 'testuser';

  it('should initialize with default lists if none exist', () => {
    localStorage.clear();
    const lists = getUserLists(testUser);
    expect(Object.keys(lists)).toEqual([
      'favorites', 'wishlist', 'played', 'playing', 'completed'
    ]);
  });

  it('should save and load lists correctly', () => {
    const sampleData = {
      favorites: [{ id: 1, name: 'FIFA 22' }],
      wishlist: [],
      played: [],
      playing: [],
      completed: [],
    };
    saveUserLists(testUser, sampleData);
    const loadedData = getUserLists(testUser);
    expect(loadedData.favorites[0].name).toBe('FIFA 22');
  });
});
