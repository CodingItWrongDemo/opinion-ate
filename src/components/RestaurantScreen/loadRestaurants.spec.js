import loadRestaurants from './loadRestaurants';

describe('loadRestaurants', () => {
  describe('while loading', () => {
    it('sets a loading flag', () => {
      const api = {
        loadRestaurants: () => new Promise(() => {}),
      };

      const setLoading = jest.fn().mockName('setLoading');

      loadRestaurants({api, setLoading});

      expect(setLoading).toHaveBeenCalledWith(true);
    });
  });

  describe('when loading succeeds', () => {
    it('stores the restaurants', async () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];

      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const setRestaurants = jest.fn().mockName('setRestaurants');

      await loadRestaurants({api, setRestaurants});

      expect(setRestaurants).toHaveBeenCalledWith(records);
    });
  });
});
