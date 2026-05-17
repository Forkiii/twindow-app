
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth()

  return(
    <div>
      <h1>hello {user?.username}  </h1>
    </div>
  )
};
