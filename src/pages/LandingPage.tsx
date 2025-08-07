import { Link } from "react-router-dom"
import Button from "../components/Button"
const LandingPage = () => {
  return (
    <>    <div className="header headertext flex justify-between items-center px-8 py-4"> 
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
   <div className="bgcolor bg-[color:var(--color-bg)] bg-linear-to-tl flex flex-col items-center min-h-screen text-center space-y-10 justify-center gap-10 ">
        <h1 style={{ color: "var(--color-text)" }} className="text-4xl">
          T-Window
        </h1>
      <p className="font-bold" style={{color: "var(--color-text)"}}>A playtime planner for you and your friends!</p>
    <Button to="/login" className="w-40">Get Started</Button>
    </div>
    </>

  )
}

export default LandingPage