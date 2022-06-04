export default async function createRestaurant({
  api,
  name,
  restaurants,
  setRestaurants,
}) {
  const returnedRestaurant = await api.createRestaurant(name);
  setRestaurants([...restaurants, returnedRestaurant]);
}
