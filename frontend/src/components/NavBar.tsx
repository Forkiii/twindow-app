import { useNavigate } from "react-router";
import ThemeButton from "./ThemeButton";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const flowers = theme === "dark" ? "🪻🌹🌺" : "🌻🌼💮";
  return (
    <header className={`navbar ${theme}`}>
      <div className="p-2 flex items-center gap-2">
        <ThemeButton />

        <p>
          {user?.username === "ola"
            ? "Hey " +
              user.username.charAt(0).toUpperCase() +
              user.username.slice(1) +
              flowers
            : "hi bitch"}
        </p>
      </div>
      <div className="justify-between flex gap-10">
        <div className={`nav-buttons ${theme}`}>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
        <div className={`nav-buttons ${theme}`}>
          <button onClick={() => navigate("/Profile")}>Profile</button>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
