import { useState } from "react";
import {authAPI} from "../services/api"
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
//login
    const handleSignup = async () => {
     try {
      console.log(user.username,user.password);
      
    const data = await authAPI.signup(user.username, user.password);
    console.log('✅ Signup Success:', data);
    localStorage.setItem('token', data.token);
    navigate('/dashboard')      
  } catch (error) {
    console.log('❌ Signup Error:', error);
  }
    }

    //submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.username || !user.password) {
      console.log("Please fill in all fields");
      return;
    }
    handleSignup();
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
          /////////STYLING///////////
          className="outline-0"
          //////////////////////
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

          <input className="outline-0" type="password" value={user.password} onChange={
            (event) => {
              console.log("password typed:"),
                setUser({
                  ...user,
                  password: event.target.value,
                })
            }} placeholder="password" />
          <button className="" type="submit">SignUp</button>

        </form>
      </div>
    </div>
  )

}


