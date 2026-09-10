from data.storage import get_all, save_favorites

def get_all_favorites(explorerName: str = None):
    data = get_all()
    return data

def append_favorite(explorerName: str, city_name: str, lat: float, lon: float):
    data = get_all()
    data[city_name] = {"lat": lat, "lon": lon}
    save_favorites(data)
    return


def get_by_city(explorerName, city_name: str) -> dict | None:
    data = get_all()
    explorerData:dict = data.get(explorerName)
    find = explorerData.get(city_name)
    return find

def update_name(explorerName, current_name:str, new_name: str):
    data = get_all()
    explorerData:dict = data.get(explorerName)
    current_dict = explorerData.get(current_name)
    if current_dict:
        explorerData[new_name] = explorerData.pop(current_name)
        save_favorites(data)
        return True
    return False



def remove_by_name(explorerName, city_name: str):
    data = get_all()
    explorerData:dict = data.get(explorerName)
    if city_name in explorerData:
        del data[city_name]
        save_favorites(data)
        return True
    return False

