import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="absolute left-0 top-0 flex flex-col min-h-[100vh] min-w-24 header " style={{padding: '1rem'}} >
      <Link to="/" className="bg-clip-text  text-transparent bg-gradient-to-r
               from-neutral-100 to-neutral-100
               hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
               transition-colors duration-500 ease-in-out ">Home</Link>

        <Link to="/" className="bg-clip-text  text-transparent bg-gradient-to-r
                 dark:from-neutral-100 dark:to-neutral-100
                 hover:from-[var(--color-accent)] hover:to-[var(--color-primary)]
                 transition-colors duration-500 ease-in-out">Profile</Link>
  </div>
  )
}
export default Sidebar;
