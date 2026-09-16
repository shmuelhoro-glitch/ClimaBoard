import type {
  CurrentWeather,
} from "../types/weatherResType";

interface CurrentCardProps {
  weather: CurrentWeather;
}

const CurrentWeatherCard = ({ weather }: CurrentCardProps) => {

  const dataForShow = {"הטמפרטורה הנוכחית": weather.now_temp, "מרגיש כמו": weather.feel_like_temp, "מהירות הרוח": weather.wind_speed, "קוד מזג האויר": weather.weather_code, "לחות": weather.humidity,"משקעים":weather.precipitation, "גשם": weather.rain, "כיסוי עננים": weather.cloud_cover, "כיוון הרוח": weather.wind_direction, "משבי רוח": weather.wind_gusts}


  return (
    <div>
      {weather.is_day? "☀️יום טוב":"🌙לילה טוב"}
      <ul>
      {Object.entries(dataForShow).map(([key, val]) => (
        <li key={key}>
        <strong>{key}:</strong> {val}
        </li>
      ))}
      </ul>
      </div>
  );
};

export default CurrentWeatherCard;
