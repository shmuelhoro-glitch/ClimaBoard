from fastapi import APIRouter , HTTPException
from services.cities_service import search_cities


router = APIRouter()

@router.get("/search/{city_name}")
def find_cities(city_name):
    try:
        if not city_name or len(city_name) < 3 or len(city_name) > 20:
             raise ValueError()
        return search_cities(city_name)
    except ValueError:
        raise HTTPException(400, "Bad request")
    except:
        raise HTTPException(500,"Internal Server Error")