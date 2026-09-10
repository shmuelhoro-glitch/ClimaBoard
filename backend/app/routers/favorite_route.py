from fastapi import APIRouter, HTTPException
from data.favorite_crud import append_favorite, remove_by_name, get_all_favorites
from schemas.validate_input import AddNewFavoriteCity


router = APIRouter()

@router.post("/{username}")
def add_new_favorite(username: str, body: AddNewFavoriteCity):
    append_favorite(username, body.city_name, body.lat, body.lon)
    return get_all_favorites()

@router.get("/{username}")
def get_favorites_router(name: str):
    data = get_all_favorites(name)
    print(data)
    return data


@router.delete("/{username}/{city}")
def delete_favorite(username: str, city: str):
    remove = remove_by_name(username, city)
    if remove:
        return get_all_favorites(username)
    raise HTTPException(404, "not found")