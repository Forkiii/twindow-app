import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='header'>
        <Link to="/" className='headertext'>TWindow</Link>
        <nav className="nav-links">
          <Link to="/login" className='headertext'>Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header