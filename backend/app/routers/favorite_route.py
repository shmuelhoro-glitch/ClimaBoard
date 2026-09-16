from fastapi import APIRouter, HTTPException
from data.favorite_crud import append_favorite, remove_by_name, get_all_favorites
from schemas.validate_input import AddNewFavoriteCity


router = APIRouter()

@router.post("/{username}", status_code=201)
def add_new_favorite(username: str, body: AddNewFavoriteCity):
    append_favorite(username, body.city_name, body.lat, body.lon)
    return get_all_favorites(username)

@router.get("/{username}")
def get_favorites_router(username: str):
    return get_all_favorites(username)
    


@router.delete("/{username}/{city}")
def delete_favorite(username: str, city: str):
    remove = remove_by_name(username, city)
    if remove:
        return get_all_favorites(username)
    raise HTTPException(404, "not found")