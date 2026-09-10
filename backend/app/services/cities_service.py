import requests
from schemas.answers import cities_list_answer


def search_cities(city_name: str):
    searching : dict = requests.get(f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&count=5").json()
    the_list = searching["results"]
    for_response = cities_list_answer(the_list)
    return for_response

