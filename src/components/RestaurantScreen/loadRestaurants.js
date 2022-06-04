export default async function loadRestaurants({api, setRestaurants}) {
  const records = await api.loadRestaurants();
  setRestaurants(records);
}
