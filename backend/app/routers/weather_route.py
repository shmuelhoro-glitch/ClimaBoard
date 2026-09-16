from fastapi import APIRouter, HTTPException
from services.weather_service import current_weather, daily_weather


router = APIRouter()


@router.get('/current')
def get_current_weather(lat, lon):
    return current_weather(lat, lon)


@router.get('/daily')
def get_daily_weather(lat, lon, days:int = 1):
    if days < 1 or days > 16:
        raise HTTPException(400, "invalid amount days")
    return daily_weather(lat, lon, days)