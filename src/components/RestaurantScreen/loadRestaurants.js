export default async function loadRestaurants({
  api,
  setRestaurants,
  setLoading,
}) {
  setLoading(true);
  const records = await api.loadRestaurants();
  setRestaurants(records);
  setLoading(false);
}
