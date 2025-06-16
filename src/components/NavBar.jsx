import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-200 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/exercise">Exercises</Link>
    </nav>
  )
}

export default NavBar
