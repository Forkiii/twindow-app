import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth()
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await signup(user.username, user.password);
      navigate("/dashboard");
    } catch (error) {
      console.log("Signup Error:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.username || !user.password) {
      console.log("Please fill in all fields");
      return;
    }

    handleSignup();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="outline-0"
          type="name"
          value={user.username}
          onChange={(event) => {
            console.log("username typed:");
            setUser({
              ...user,
              username: event.target.value,
            });
          }}
          placeholder="username"
        />

        <input
          className="outline-0"
          type="password"
          value={user.password}
          onChange={(event) => {
            console.log("password typed:");
            setUser({
              ...user,
              password: event.target.value,
            });
          }}
          placeholder="password"
        />
        <button className="" type="submit">SignUp</button>
      </form>
      <button type="button" onClick={() => navigate("/login")}>
        Already have an account?
      </button>
    </div>
  );
}
