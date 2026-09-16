import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <div> Header
        <nav>
          <NavLink to={'/app/favorites'} >מועדפים</NavLink>
        </nav>
    </div>
  )
}

export default Header