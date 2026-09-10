from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from data.favorite_crud import get_by_city, append_favorite, remove_by_name, update_name, get_all_favorites
from schemas.validate_input import AddNewFavoriteCity, ExplorerNameValid, UpdateCityName, DeleteCityValid


router = APIRouter()

@router.post("/")
def add_new_favorite(explorer_name, city_name, lat, lon):
    append_favorite(explorer_name, city_name, lat, lon)
    return get_all_favorites()

@router.get("/all{name}")
def get_favorites_router(name: str):
    data = get_all_favorites(name)
    print(data)
    return data


@router.get("/{city_name}")
def get_one(city_name: str):
    data = get_by_city(city_name)
    if data:
        return data
    raise HTTPException(404, "not found")



@router.put("/")
def update_favorite(names_p: UpdateCityName):
    names = names_p.model_dump()
    explorer_name = names["explorer_name"]
    current_name = names["currentName"]
    new_name = names["new_name"]

    is_done = update_name(explorer_name, current_name, new_name)
    if is_done:
        return get_all_favorites(explorer_name)
    raise HTTPException(404, "not found")


@router.delete("/")
def delete_favorite(names_p: DeleteCityValid):
    names = names_p.model_dump()
    explorer_name = names["explorer_name"]
    city_name = names["city_name"]
    remove = remove_by_name(explorer_name, city_name)
    if remove:
        return get_all_favorites(explorer_name)
    raise HTTPException(404, "not found")