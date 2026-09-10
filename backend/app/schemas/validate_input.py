from pydantic import BaseModel, Field


class AddNewFavoriteCity(BaseModel):
    explorerName: str = Field(min_length=2, max_length=20)
    city_name: str = Field(min_length=2, max_length=20)
    lat: float
    lon: float


class ExplorerNameValid(BaseModel):
    explorerName: str = Field(min_length=2, max_length=20)



class UpdateCityName(BaseModel):
    explorerName: str
    currentName: str
    newName: str


class DeleteCityValid(BaseModel):
    explorerName: str
    city_name: str