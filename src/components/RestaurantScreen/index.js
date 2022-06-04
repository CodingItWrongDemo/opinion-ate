import {useState} from 'react';
import RestaurantList from '../RestaurantList';
import api from '../../api';
import loadRestaurants from './loadRestaurants';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);

  function handleLoadRestaurants() {
    loadRestaurants({api, setRestaurants});
  }

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
