import {useState} from 'react';
import RestaurantList from './RestaurantList';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);

  function handleLoadRestaurants() {}

  return (
    <div>
      <h1>Restaurants</h1>
      <RestaurantList
        restaurants={restaurants}
        loadRestaurants={handleLoadRestaurants}
      />
    </div>
  );
}
