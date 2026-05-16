
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return(
    <div>
      <h1>hello {user?.username}</h1>
    </div>
  )
};
