import createRestaurant from './createRestaurant';

describe('createRestaurant', () => {
  const newRestaurantName = 'Sushi Place';
  const existingRestaurant = {id: 1, name: 'Pizza Place'};
  const responseRestaurant = {id: 2, name: newRestaurantName};
  const restaurants = [existingRestaurant];

  let api;

  beforeEach(() => {
    api = {
      createRestaurant: jest.fn().mockName('createRestaurant'),
    };
  });

  it('saves the restaurant to the server', () => {
    api.createRestaurant.mockReturnValue(new Promise(() => {}));
    createRestaurant({api, name: newRestaurantName});
    expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
  });

  describe('when save succeeds', () => {
    let setRestaurants;

    beforeEach(() => {
      api.createRestaurant.mockResolvedValue(responseRestaurant);

      setRestaurants = jest.fn();

      return createRestaurant({
        api,
        name: newRestaurantName,
        restaurants,
        setRestaurants,
      });
    });

    it('adds the returned restaurant to the list', () => {
      expect(setRestaurants).toHaveBeenCalledWith([
        existingRestaurant,
        responseRestaurant,
      ]);
    });
  });

  describe('when save fails', () => {
    it('rejects', () => {
      api.createRestaurant.mockRejectedValue();
      const promise = createRestaurant({api});
      return expect(promise).rejects.toBeUndefined();
    });
  });
});
