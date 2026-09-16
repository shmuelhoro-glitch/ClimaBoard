import api from "./api";

export async function createNewFavorite(
  userName: string,
  cityName: string,
  lat: number,
  lon: number,
) {
  const { data } = await api.post(`/favorites/${encodeURIComponent(userName)}`, {
    cityName,
    lat,
    lon,
  });
  return data;
}

export async function getFavorites(userName: string) {
  const {data}  = await api.get(`/favorites/${encodeURIComponent(userName)}`);
  return data;
}

export async function deleteFavorite(userName: string, cityName: string) {
  const { data } = await api.delete(`/favorites/${encodeURIComponent(userName)}/${encodeURIComponent(cityName)}`);
  return data;
}
