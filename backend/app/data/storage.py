import json


def get_all() -> dict:
    try:
        with open("./data/data.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            if data:
                return data
    except json.JSONDecodeError:
        return {}


def save_favorites(updated_data):
    with open("./data/data.json", "w", encoding="utf-8") as f:
        json.dump((updated_data), f, indent=2)
        return True



# print(get_all())
# print(save_favorites({"jerusalem":{"lat": 31.76904, "lon": 35.21633}}))
# print(get_all())