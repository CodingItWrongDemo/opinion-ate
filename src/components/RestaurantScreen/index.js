import {useCallback, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from '../RestaurantList';
import api from '../../api';
import loadRestaurants from './loadRestaurants';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoadRestaurants = useCallback(() => {
    loadRestaurants({api, setRestaurants, setLoading});
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <RestaurantList
          restaurants={restaurants}
          loadRestaurants={handleLoadRestaurants}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
