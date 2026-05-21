import { Outlet } from "react-router-dom";
import NavBar from  "../components/NavBar"
export default function ProtectedLayout() {
  return (
    <div>
        <NavBar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}