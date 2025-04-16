export const getUserLists = (username) => {
    const saved = localStorage.getItem(`${username}_lists`);
    const defaultLists = {
      favorites: [],
      wishlist: [],
      played: [],
      playing: [],
      completed: [],
    };
  
    let parsed = {};
    try {
      parsed = saved ? JSON.parse(saved) : {};
    } catch {
      parsed = {};
    }
  
    return { ...defaultLists, ...parsed };
  };
  
  export const saveUserLists = (username, lists) => {
    localStorage.setItem(`${username}_lists`, JSON.stringify(lists));
  };
  