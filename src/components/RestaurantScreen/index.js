import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from '../RestaurantList';
import NewRestaurantForm from '../NewRestaurantForm';
import api from '../../api';
import loadRestaurants from './loadRestaurants';
import createRestaurant from './createRestaurant';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  function handleLoadRestaurants() {
    loadRestaurants({api, setRestaurants, setLoading, setLoadError});
  }

  function handleCreateRestaurant(name) {
    createRestaurant({api, name, restaurants, setRestaurants});
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm />
        <RestaurantList />
      </CardContent>
    </Card>
  );
}
