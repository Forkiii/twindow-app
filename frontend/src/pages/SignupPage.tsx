import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";

const SignupPage = () => {
  //signup logic
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    password: "",
    username: "",
  });
  const { password, username } = inputValue;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err: String) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg: String) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form with data:', inputValue);

    try {
      
      const { data } = await axios.post(
        "http://localhost:5000/api/signup",
        {
          ...inputValue,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Response received:', data);

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        navigate("/dashboard",{
        state: { 
            user: data.user,
            message: "Welcome! Your account has been created successfully." 
          } 
          })
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error('Request error:', error);

      // Type guard to check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          handleError("Request timed out - server might be slow");
        } else if (error.response) {
          // Server responded with error status
          console.log('Error response:', error.response.data);
          handleError(`Server error: ${error.response.data?.message || 'Unknown error'}`);
        } else if (error.request) {
          // Request made but no response
          console.log('No response received:', error.request);
          handleError("No response from server - check if server is running");
        } else {
          handleError("Network error or server is not responding");
        }
      } else {
        // Handle non-Axios errors
        handleError("An unexpected error occurred");
      }
    }

    setInputValue({
      ...inputValue,
      password: "",
      username: "",
    });
  };

  return (
    <div className="bgcolor flex flex-col items-center min-h-screen text-center space-y-10 justify-center gap-10 ">

      <h1 style={{ color: "var(--color-text)" }} className="text-4xl">
        Sign Up
      </h1>
      <p
        style={{ color: "var(--color-text-muted)" }}
        className="text-lg mt-2 mb-6"
      >
        Sign up for your T-Window account
      </p>

      {/* Input fields for signup */}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          className="text_input max-w-80 w-full outline-none spellcheck-false"
          type="text"
          name="username"
          value={username}
          placeholder="Enter your username"
          onChange={handleOnChange}
        />
        <input
          className="text_input max-w-80 w-full outline-none spellcheck-false"
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
        {/* <input
        className="text_input max-w-80 w-full outline-none spellcheck-false"
        type="password"
        placeholder="Confirm Password"
      /> */}
        <Button type="submit">Sign Up</Button>
      </form>

      {/* Button for signup */}
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