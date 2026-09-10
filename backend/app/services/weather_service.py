import requests
from schemas.answers import fix_details_current, map_daily


def current_weather(lat: float, lon: float):
    req = requests.get(
        f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m#current_weather"
    ).json()
    for_response = fix_details_current(req["current"])
    return for_response


def daily_weather(lat: float, lon: float, days: int):
    req = requests.get(
        f"https://api.open-meteo.com/v1/forecast?forecast_days={days}&latitude={lat}&longitude={lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max,precipitation_hours,uv_index_max,rain_sum,precipitation_sum"
    ).json()
    for_response = map_daily(req["daily"])
    return for_response
