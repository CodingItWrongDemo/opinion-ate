export default async function loadRestaurants({
  api,
  setRestaurants,
  setLoading,
  setLoadError,
}) {
  try {
    setLoading(true);
    setLoadError(false);
    const records = await api.loadRestaurants();
    setRestaurants(records);
    setLoading(false);
  } catch {
    setLoadError(true);
    setLoading(false);
  }
}
