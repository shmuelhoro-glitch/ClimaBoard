from data.storage import get_all, save_favorites

def get_all_favorites(username: str):
    data = get_all()
    user_favorites = data.get(username)
    return user_favorites

def append_favorite(username: str, city: str, lat, lon):
    data = get_all()
    if username not in data:
        data[username] = []

    data[username].append({"city": city, "lat": float(lat), "lon": float(lon)})
    save_favorites(data)
    return


def remove_by_name(username:str , city_name:str ):
    data = get_all()
    for i,favorite in enumerate(data[username]):
        if favorite["city"] == city_name:
            del data[username][i]
            save_favorites(data)
            return True
    return False



