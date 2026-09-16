import { useEffect, useState } from "react"
import { getFavorites } from "../services/favoriteServices"
import type { Favorite } from "../types/favoriteType"


const FavoritesPage = () => {

  const [result, setResult] = useState<Favorite []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const userName:string | null = localStorage.getItem("userName")
  console.log(userName)

  useEffect(() => {
    async function loadFavorites(){
      setIsLoading(true)
      if (!userName){
        setError('no found user name')
        setIsLoading(false)
        return
      }
      try {
      const req = await getFavorites(userName)
      setResult(req)
      console.log(result)
      } catch (err) {
        setError("Error")
      } finally {
        setIsLoading(false)
      }
      
    }
    loadFavorites()
  },[])

  if (isLoading) return <div className="loading">טוען...</div>

  if (error) return <div>{error}</div>

  return (
    <div>
      <ul>
      {result.map((fav) => (
        <li key={fav.city}>
          <h3>{fav.city}</h3>
          <p>lat {fav.lat}</p>
          <p>lon {fav.lon}</p>

        </li>
      ))}
      </ul>
    </div>
  )
}

export default FavoritesPage