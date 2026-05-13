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

      // data: {
      //     message: string;
      //     user: {
      //         id: string;
      //         username: string;
      //         createdAt?: string | undefined;
      //     };
      //     token: string;
      // }

      const data = await authAPI.login(user.username, user.password);
      console.log('✅ Login Success:', data);
      localStorage.setItem('token', data.token);
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
        <button type="button" onClick={() => navigate('/signup')}>
          Don't have an account?
        </button>
      </div>
    </div>
  )

}


