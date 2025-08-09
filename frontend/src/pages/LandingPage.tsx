import 'react-tabs/style/react-tabs.css';
import Button from "../components/Button";
const LandingPage = () => {
  return (
    <div className="bg-linear-to-tl flex flex-col items-center min-h-screen text-center space-y-10 justify-center gap-10 ">
      <h1 style={{ color: "var(--color-text)" }} className="text-6xl font-bold">
        T-Window
      </h1>
      <p className="font-bold" style={{ color: "var(--color-text)" }}>A playtime planner for you and your friends!</p>
      <Button to="/login" className="w-40">Get Started</Button>
    </div>

  )
}

export default LandingPage