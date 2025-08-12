import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
    return (
      <></>
    )
  }
  return (<header className="header flex " style={{ padding: '0.75rem' }}>
    <div className='justify-self-start' >
      <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r
               from-neutral-100 to-neutral-100
               hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
               transition-colors duration-500 ease-in-out ">Home</Link>
    </div>
    <div className='flex gap-20 justify-end w-full' style={{ paddingRight: '4rem' }}>
      <Link to="/profile" className="bg-clip-text text-transparent bg-gradient-to-r
                 dark:from-neutral-100 dark:to-neutral-100
                 hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
                 transition-colors duration-900 ease-in-out">Profile</Link>

      <Link to="/friends" className="bg-clip-text text-transparent bg-gradient-to-r
                 dark:from-neutral-100 dark:to-neutral-100
                 hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
                 transition-colors duration-500 ease-in-out">Friends</Link>
      <Link to="/calendar" className="bg-clip-text text-transparent bg-gradient-to-r
                 dark:from-neutral-100 dark:to-neutral-100
                 hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
                 transition-colors duration-900 ease-in-out">Calendar</Link>
    </div>
  </header>)
}

export default Header