import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";


export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    try { 
      await login(user.username, user.password);
      navigate('/dashboard')
    } catch (error) {
      console.log('❌ Login Error:', error);
    }
  };


  // When you click submit trigger handleLogin
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.username || !user.password) {
      console.log("Please fill in all fields");
      return;
    }
    handleLogin();
  }

  return (
    <div>
      <div className="border-2">
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            value={user.username}
            onChange={
              (event) => {
                console.log("username typed:");
                setUser({
                  ...user,
                  username: event.target.value,
                })
              }}
            placeholder="username" />

          <input type="password" value={user.password} onChange={
            (event) => {
              console.log("password typed:");
              setUser({
                ...user,
                password: event.target.value,
              })
            }} placeholder="password" />
          <button type="submit">Login</button>

        </form>
        <button type="button" onClick={() => navigate('/signup')}>
          Don't have an account?
        </button>
      </div>
    </div>
  )

}


