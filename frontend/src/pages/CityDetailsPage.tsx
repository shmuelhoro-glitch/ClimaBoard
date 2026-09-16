import { useParams, useSearchParams } from "react-router-dom"
import { getCurrentWeather, getWeatherDaily } from "../services/weatherService"
import { useEffect, useState } from "react"
import type { CurrentWeather, WeatherByDate } from "../types/weatherResType"
import CurrentWeatherCard from "../components/CurrentWeatherCard"
import ForecastList from "../components/ForecastList"



const FORECAST_DAYS = 7

const CityDetailsPage = () => {
    const { cityName } = useParams()
    const [searchParams] = useSearchParams()

    const lat = String(searchParams.get("lat"))
    const lon = String(searchParams.get("lon"))

    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null)
    const [forecast, setForecast] = useState<WeatherByDate | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)



    useEffect(() => {
      async function loadWeather(){
        setIsLoading(true)
        setError(null)
        try {
          const [current, daily] = await Promise.all([
            getCurrentWeather(lat, lon),
            getWeatherDaily(lat, lon, FORECAST_DAYS)
          ])
          setCurrentWeather(current)
          setForecast(daily)
        } catch (err) {
          setError("שגיאה במשיכת הנתונים מהשרת")
        } finally {
          setIsLoading(false)
        }

      }
      loadWeather()
    },[lat, lon])
    

    if (isLoading) return <div>טוען...</div>
    if (error) return <div>{error}</div>

    
  return (
    <div>
    <h2>{cityName}</h2>
    {currentWeather && <CurrentWeatherCard weather={currentWeather} />}
    {forecast && <ForecastList forecast={forecast} />}
    </div>
  )
}

export default CityDetailsPage