export interface CityDetails {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface CurrentWeather {
  now_temp: number;
  feel_like_temp: number;
  wind_speed: number;
  weather_code: number;
  humidity: number;
  is_day: boolean;
  precipitation: number;
  rain: number;
  cloud_cover: number;
  wind_direction: number;
  wind_gusts: number;
}

export interface DailyWeather {
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  apparent_temperature_max: number;
  apparent_temperature_min: number;
  wind_speed_10m_max: number;
  wind_gusts_10m_max: number;
  precipitation_hours: number;
  uv_index_max: number;
  rain_sum: number;
  precipitation_sum: number;
}

export interface WeatherByDate {
  [date: string]: DailyWeather;
}

export interface FavoritesStructure {
  city: string;
  lat: number;
  lon: number;
}


export interface LocationDetailsType {
  city: string;
  lat: string;
  lon: string;
}



export const dailyWeatherLabels = {
  weather_code: "קוד מזג אוויר",
  temperature_2m_max: "טמפרטורה מקסימלית",
  temperature_2m_min: "טמפרטורה מינימלית",
  apparent_temperature_max: "מרגיש כמו (מקסימום)",
  apparent_temperature_min: "מרגיש כמו (מינימום)",
  wind_speed_10m_max: "מהירות רוח מקסימלית",
  wind_gusts_10m_max: "משבי רוח מקסימליים",
  precipitation_hours: "שעות משקעים",
  uv_index_max: "מדד UV מקסימלי",
  rain_sum: "סך גשם",
  precipitation_sum: "סך משקעים",
};


export const currentWeatherLabels = {
  now_temp: "הטמפרטורה הנוכחית",
  feel_like_temp: "מרגיש כמו",
  wind_speed: "מהירות הרוח",
  weather_code: "קוד מזג האוויר",
  humidity: "לחות",
  precipitation: "משקעים",
  rain: "גשם",
  cloud_cover: "כיסוי עננים",
  wind_direction: "כיוון הרוח",
  wind_gusts: "משבי רוח",
};