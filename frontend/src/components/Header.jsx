import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <header className="celestial-gradient shadow-lg border-b-2 border-heritage-gold">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 heritage-gradient rounded-full flex items-center justify-center">
              <span className="text-2xl">☀</span>
            </div>
            <h1 className="text-2xl font-bold text-heritage-gold">Heritage Astronomy</h1>
          </Link>
          
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-heritage-gold text-celestial-navy' 
                  : 'text-heritage-gold hover:bg-celestial-deepblue'
              }`}
            >
              Home
            </Link>
            <Link
              to="/simulation"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/simulation')
                  ? 'bg-heritage-gold text-celestial-navy'
                  : 'text-heritage-gold hover:bg-celestial-deepblue'
              }`}
            >
              Simulation
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-heritage-gold text-celestial-navy'
                  : 'text-heritage-gold hover:bg-celestial-deepblue'
              }`}
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
