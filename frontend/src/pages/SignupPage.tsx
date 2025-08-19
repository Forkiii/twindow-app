import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";

const SignupPage = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', userData,);
        // Backend says signup succeeded
       alert(res.data.message); 
       localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
    } catch (err  ) {
       const error = err as AxiosError<{ message: string }>;
        alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bgcolor flex flex-col items-center min-h-screen text-center space-y-10 justify-center gap-10 ">

      <h1 style={{ color: "var(--color-text)" }} className="text-4xl">
        Sign Up
      </h1>
      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-lg mt-2 mb-6">
        Sign up for your T-Window account
      </p>

      {/* Input fields for signup */}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          className="text_input max-w-80 w-full outline-none spellcheck-false"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        <input
          className="text_input max-w-80 w-full outline-none spellcheck-false"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <Button type="submit">Sign Up</Button>
      </form>

      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-sm mt-4">
        Have an account?{" "}
        <a
          style={{ color: "var(--color-primary)" }}
          href="/login"
          className="underline"
        >
          Sign In
        </a>
      </p>
      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-sm mt-2"
      >
        <a
          style={{ color: "var(--color-primary)" }}
          href="/"
          className="underline"
        >
          Back to home
        </a>
      </p>
    </div>
  );
}

export default SignupPage