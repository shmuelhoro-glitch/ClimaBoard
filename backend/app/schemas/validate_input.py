from pydantic import BaseModel, Field


class AddNewFavoriteCity(BaseModel):
    city_name: str = Field(min_length=2, max_length=20)
    lat: float
    lon: float
