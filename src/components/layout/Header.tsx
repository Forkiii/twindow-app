import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
<div className="header headertext flex justify-between items-center px-8 py-4"> 
  <div> 
    <Link to="/" className="hover:[color:var(--color-secondary)]">TWindow</Link> 
  </div> 
  <div className="flex items-center gap-20"> 
    <Link to="/" className="hover:[color:var(--color-secondary)]">Product</Link> 
    <Link to="/" className="hover:[color:var(--color-secondary)]">Features</Link> 
    <Link to="/" className="hover:[color:var(--color-secondary)]">Marketplace</Link> 
    <Link to="/" className="hover:[color:var(--color-secondary)]">Company</Link> 
  </div>
  <div>
    <Link to="/" className="hover:[color:var(--color-secondary)]">Log in →</Link>
  </div>
</div>
  </header>
  )
}

export default Header