import loadRestaurants from './loadRestaurants';

describe('loadRestaurants', () => {
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
