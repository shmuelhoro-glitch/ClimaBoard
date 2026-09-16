import { useState } from "react";
import { getCurrentWeather } from "../services/weatherService";
import type { CurrentWeather } from "../types/weatherResType";

const DashboardPage = () => {
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [result, setResult] = useState<CurrentWeather | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSearch() {
    setIsLoading(true);
    try {
      const req = await getCurrentWeather(Number(lat), Number(lon));
      setResult(req);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading ? (
        <h2 className="loading">loading...</h2>
      ) : (
        <div className="inputs">
            <input
              type="text"
              value={lat}
              placeholder="lat"
              onChange={(e) => {
                setLat(e.target.value);
              }}
            />
          <input
            type="text"
            value={lon}
            placeholder="lon"
            onChange={(e) => {
              setLon(e.target.value);
            }}
          />
          <button onClick={() => handleSearch()}>send</button>
        </div>
      )}
      {result && (
        <section>
          <h1>{result.is_day && "☀️" || "🌙"}</h1>
          <ul>
          <li>הטמפרטורה כרגע {result.now_temp}</li>
          <li>מרגיש כמו {result.feel_like_temp}</li>
          <li>מהירות הרוח {result.wind_speed}</li>
          <li>קוד מזג האוויר {result.weather_code} </li>
          <li>לחות {result.humidity}%</li>
          <li>{result.precipitation}</li>
          <li>{result.rain}</li>
          <li>{result.cloud_cover}</li>
          <li>{result.wind_direction}</li>
          <li>{result.wind_gusts}</li>
          </ul>
        </section>
      )}
    </div>
  );
};
export default DashboardPage;







          // <ul>
          // <li><p>הטמפרטורה כרגע {result.now_temp}</p></li>
          // <li><p>מרגיש כמו {result.feel_like_temp}</p></li>
          // <li><p>מהירות הרוח {result.wind_speed}</p></li>
          // <li><p>קוד מזג האוויר {result.weather_code} </p></li>
          // <li><p>לחות {result.humidity}%</p></li>
          // <li><p>{result.precipitation}</p></li>
          // <li><p>{result.rain}</p></li>
          // <li><p>{result.cloud_cover}</p></li>
          // <li><p>{result.wind_direction}</p></li>
          // <li><p>{result.wind_gusts}</p></li>
          // </ul>