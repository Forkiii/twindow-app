import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import Button from "../components/Button";
const LoginPage = () => {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,                // keep the other fields unchanged
      [e.target.name]: e.target.value // update the field being typed into
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stops page reload
if (!inputValue.username || !inputValue.password) {
    toast.error("Please fill both username and password");
    return;
  }
    try {
      const res = await axios.post("/api/login", {
        username: inputValue.username,
        password: inputValue.password
      });

      // Save token (localStorage or cookies)
      localStorage.setItem("token", res.data.token);

      const { success } = res.data;
      if(success){
        navigate("/dashboard",{
        state: { 
            user: res.data.user,
            message: "Welcome!" 
          } 
          })
      } 
      }
    catch (err: any) {
      // Show error
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className=" bgcolor flex flex-col items-center min-h-screen text-center space-y-10 justify-center gap-10 ">

      <h1 style={{ color: "var(--color-text)" }} className="  text-4xl">
        Login
      </h1>
      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-lg mt-2 mb-6"
      >
        Sign in to your T-Window account
      </p>



      {/* loginform */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          className="text_input max-w-80 w-full outline-none spellcheck-false"
          type="text"
          name="username"
          value={inputValue.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          className="text_input max-w-80 w-full outline-none spellcheck-false"
          type="password"
          name="password"
          value={inputValue.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>

      </form>
      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-sm mt-4">
        Don't have an account?{" "}
        <a
          style={{ color: "var(--color-primary)" }}
          href="/signup"
          className="underline"
        >
          Sign up
        </a>
      </p>
      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-sm mt-2"
      >
        <a
          style={{ color: "var(--color-primary)" }}
          href="/"
          className=" underline"
        >
          Back to home
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
