import { dailyWeatherLabels, type WeatherByDate } from "../types/weatherResType"


interface ForecastProps {
    forecast: WeatherByDate
}





const ForecastList = ({forecast}: ForecastProps) => {

  return (
    <div>
      <h3>תחזית</h3>
    {Object.entries(forecast).map(([date, dayData]) => (
       <li key={date} className="forecastDayCard">
        <h4>{date}</h4>
        <ul>
          {Object.entries(dayData).map(([key, val]) => (
            <li key={key}>
              <strong>
                {dailyWeatherLabels[key as keyof typeof dailyWeatherLabels]}:
              </strong>{""}
              {val}
            </li>
          ))}
        </ul>
        </li>
    ))}
    
    </div>
  )
}

export default ForecastList