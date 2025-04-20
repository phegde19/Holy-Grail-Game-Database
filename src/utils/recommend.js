// utils/recommend.js

export const generateRecommendations = (userGames, allGames) => {
    if (!userGames.length || !allGames.length) return [];
  
    // Count genres from user's saved games
    const genreFrequency = {};
  
    userGames.forEach(game => {
      game.genres?.forEach(genre => {
        genreFrequency[genre.name] = (genreFrequency[genre.name] || 0) + 1;
      });
    });
  
    // Score each candidate game based on genre overlap
    const scoredGames = allGames.map(game => {
      let score = 0;
      game.genres?.forEach(genre => {
        if (genreFrequency[genre.name]) {
          score += genreFrequency[genre.name];
        }
      });
      return { ...game, score };
    });
  
    // Filter out games already in user list and sort by score + rating
    const userGameIds = new Set(userGames.map(g => g.id));
  
    return scoredGames
      .filter(g => !userGameIds.has(g.id) && g.score > 0)
      .sort((a, b) => b.score - a.score || b.rating - a.rating)
      .slice(0, 12); // Top 12 recommendations
  };
  