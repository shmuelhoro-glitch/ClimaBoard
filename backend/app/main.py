from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.weather_route import router as weather_router
from routers.cities_router import router as cities_find_router
from routers.comparison_route import router as comparison_router
from routers.favorite_route import router as favorite_router


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173'
    ],
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True,
)



@app.get('/health', tags=["health"])
def getHealth():
    return "The server Ok"


app.include_router(cities_find_router, prefix="/cities", tags=["cities"])

app.include_router(weather_router, prefix="/weather", tags=["weather"])

app.include_router(comparison_router, prefix="/comparison", tags=["weather"])

app.include_router(favorite_router, prefix="/favorites", tags=["favorites"])


