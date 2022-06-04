import loadRestaurants from './loadRestaurants';

describe('loadRestaurants', () => {
  describe('while loading', () => {
    let setLoading;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => new Promise(() => {}),
      };

      setLoading = jest.fn().mockName('setLoading');

      loadRestaurants({api, setLoading});
    });

    it('sets a loading flag', () => {
      expect(setLoading).toHaveBeenCalledWith(true);
    });
  });

  describe('when loading succeeds', () => {
    const records = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];

    let setRestaurants;
    let setLoading;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      setRestaurants = jest.fn().mockName('setRestaurants');
      setLoading = jest.fn().mockName('setLoading');

      return loadRestaurants({api, setRestaurants, setLoading});
    });

    it('stores the restaurants', () => {
      expect(setRestaurants).toHaveBeenCalledWith(records);
    });

    it('clears the loading flag', () => {
      expect(setLoading).toHaveBeenLastCalledWith(false);
    });
  });

  describe('when loading fails', () => {
    let setLoading;
    let setLoadError;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.reject(),
      };

      setLoading = jest.fn().mockName('setLoading');
      setLoadError = jest.fn().mockName('setLoadError');

      return loadRestaurants({api, setLoading, setLoadError});
    });

    it('sets an error flag', () => {
      expect(setLoadError).toHaveBeenCalledWith(true);
    });
  });
});
