import { useState } from "react"
import { useNavigate } from "react-router-dom"

const WelcomePage = () => {

  const [userName, setUserName] = useState<string>("")
  const [errorMess, setErrorMess] = useState<string | null>(null)
  const navigate = useNavigate()

  function keepName(){
    if (userName.trim().length < 3){
      setErrorMess('Invalid name')
      return
    }
    JSON.stringify(localStorage.setItem('userName',userName))
    navigate('/app/dashboard')
  }

  return (
    <div>
      <h1>מזג אוויר ☀️</h1>
      <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} placeholder="שם מלא" />
      <button onClick={() => {keepName()}}>יאללה בא נתקדם</button>
      <p>{errorMess}</p>
    </div>
  )
}

export default WelcomePage