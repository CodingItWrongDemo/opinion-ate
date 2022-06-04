import createRestaurant from './createRestaurant';

describe('createRestaurant', () => {
  const newRestaurantName = 'Sushi Place';

  let api;

  beforeEach(() => {
    api = {
      createRestaurant: jest.fn().mockName('createRestaurant'),
    };
  });

  it('saves the restaurant to the server', () => {
    createRestaurant({api, name: newRestaurantName});
    expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
  });
});
