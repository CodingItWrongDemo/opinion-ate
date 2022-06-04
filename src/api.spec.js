import nock from 'nock';
import api from './api';

describe('api', () => {
  const corsHeaders = {'Access-Control-Allow-Origin': '*'};

  describe('loadRestaurants', () => {
    const restaurants = [{id: '1', name: 'Sushi Place'}];

    it('returns the response to the right endpoint', async () => {
      nock('https://api.outsidein.dev')
        .get('/TOPDDhuzdfNDL42ZwUxFfA4C0nGEUaVl/restaurants')
        .reply(200, restaurants, corsHeaders);

      await expect(api.loadRestaurants()).resolves.toEqual(restaurants);
    });
  });

  describe('createRestaurant', () => {
    const restaurantName = 'Sushi Place';
    const responseRestaurant = {id: '1', name: restaurantName};

    it('returns the response to the right endpoint', async () => {
      nock('https://api.outsidein.dev')
        .post('/TOPDDhuzdfNDL42ZwUxFfA4C0nGEUaVl/restaurants', {
          name: restaurantName,
        })
        .reply(200, responseRestaurant, corsHeaders);

      await expect(api.createRestaurant(restaurantName)).resolves.toEqual(
        responseRestaurant,
      );
    });
  });
});
