from pydantic import BaseModel



class Cities_schema(BaseModel):
    name: str
    latitude: float
    longitude: float
    country: str




def cities_list_answer(res_list: list):
    cities_list = []
    for city in res_list:
        valid_city = Cities_schema(**city)
        cities_list.append(valid_city)
    return cities_list



class Current_weather_schema(BaseModel):
    temperature_2m: float
    apparent_temperature: float
    wind_speed_10m: float
    weather_code: int
    relative_humidity_2m: int
    is_day: int
    precipitation: int
    rain: float | int
    showers: float | int
    snowfall: float | int
    cloud_cover: int
    pressure_msl: float
    surface_pressure: float
    wind_direction_10m: int
    wind_gusts_10m: float



def fix_details_current(res_list: list):
    valid_details = Current_weather_schema(**res_list)
    new_dict = {
        "now_temp": valid_details.temperature_2m,
        "feel_like_temp": valid_details.apparent_temperature,
        "wind_speed": valid_details.wind_speed_10m,
        "weather_code": valid_details.weather_code,
        "humidity": valid_details.relative_humidity_2m,
        "is_day": valid_details.is_day,
        "precipitation": valid_details.precipitation,
        "rain": valid_details.rain,
        "cloud_cover": valid_details.cloud_cover,
        "wind_direction": valid_details.wind_direction_10m,
        "wind_gusts": valid_details.wind_gusts_10m
    }
    return new_dict



def map_daily(daily_dict: dict):
    after_map = {}
    days = daily_dict.get('time', [])

    for i, data in enumerate(days):
        after_map[data] = {}
        for key, val in daily_dict.items():
            if key != "time":
                after_map[data][key] = val[i]
    return after_map

