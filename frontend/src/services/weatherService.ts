import api from "./api";




export async function getCurrentWeather(lat: string, lon: string){
    const {data} = await api.get(`weather/current?lat=${lat}&lon=${lon}`)
    return data

}

export async function getWeatherDaily(lat: string, lon: string, days: number){
    const {data} = await api.get(`weather/daily?lat=${lat}&lon=${lon}&days=${days}`)
    return data
}


export async function getLocationByName(cityName: string){
    const {data} = await api.get(`/cities/search/${encodeURIComponent(cityName)}`)
    return data
}


