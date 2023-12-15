import { NavLink } from "react-router-dom"
const Navbar = () => {
  return (
    <header className="header">
  <NavLink to="/" className="w-16 h-7.5 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
    <p className="christmas-gradient-text">WWM</p>
  </NavLink>

  <nav className="flex text-lg gap-7 font-medium">
    <NavLink to="chris" className={({ isActive }) => (isActive ? 'text-green-700' : 'text-black')}>
      Chris
    </NavLink>

    <NavLink to="dom" className={({ isActive }) => (isActive ? 'text-green-700' : 'text-black')}>
      Dom
    </NavLink>

    <NavLink to="alex" className={({ isActive }) => (isActive ? 'text-green-700' : 'text-black')}>
      Alex
    </NavLink>
  </nav>
</header>

  )
}

export default Navbar