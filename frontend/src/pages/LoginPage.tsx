import { useState } from "react";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router";



export default function LoginPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const data = await authAPI.login(user.username, user.password);
      console.log('✅ Login Success:', data);
      localStorage.setItem('token', data.token);
      navigate('/dashboard')
    } catch (error) {
      console.log('❌ Login Error:', error);
    }
  };
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
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            value={user.username}
            onChange={
              (event) => {
                console.log("username typed:"),
                  setUser({
                    ...user,
                    username: event.target.value,
                  })
              }}
            placeholder="username" />

          <input type="password" value={user.password} onChange={
            (event) => {
              console.log("password typed:"),
                setUser({
                  ...user,
                  password: event.target.value,
                })
            }} placeholder="password" />
          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  )

}


