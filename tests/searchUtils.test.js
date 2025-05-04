describe('Search Utility Tests', () => {
    const games = [
      { name: 'FIFA 22' },
      { name: 'Red Dead Redemption 2' },
      { name: 'Minecraft' },
    ];
  
    it('filters games by search term', () => {
      const filtered = games.filter(g => g.name.toLowerCase().includes('fifa'));
      expect(filtered).toEqual([{ name: 'FIFA 22' }]);
    });
  
    it('returns empty array for no match', () => {
      const filtered = games.filter(g => g.name.toLowerCase().includes('halo'));
      expect(filtered.length).toBe(0);
    });
  });
  