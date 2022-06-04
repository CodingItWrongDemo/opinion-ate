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
    const records = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];

    let setRestaurants;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      setRestaurants = jest.fn().mockName('setRestaurants');
      const setLoading = () => {};

      return loadRestaurants({api, setRestaurants, setLoading});
    });

    it('stores the restaurants', () => {
      expect(setRestaurants).toHaveBeenCalledWith(records);
    });
  });
});
