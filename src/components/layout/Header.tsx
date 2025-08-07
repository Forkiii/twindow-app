import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=" header flex justify-center-safe  max-h-12 gap-60 ">
          <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r
                 from-neutral-100 to-neutral-100
                 hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
                 transition-colors duration-500 ease-in-out">Home</Link>
    
          <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r   
                 dark:from-neutral-100 dark:to-neutral-100
                 hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
                 transition-colors duration-500 ease-in-out">Profile</Link>


    </header>
  )
}

export default Header