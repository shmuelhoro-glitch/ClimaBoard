from fastapi import APIRouter
from services.weather_service import current_weather


router = APIRouter()

def tow_cities_weather(lat_1: float, lon_1: float, lat_2: float, lon_2: float):
    city_1 = current_weather(lat_1,lon_1)
    city_2 = current_weather(lat_2, lon_2)
    return [city_1, city_2]





@router.get("/")
def get_comparison_tow_cities(lat_1, lon_1, lat_2, lon_2):
    return tow_cities_weather(lat_1, lon_1, lat_2, lon_2)

