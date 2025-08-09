import Button from "../components/Button";

const SignupPage = () => {
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

      <input
        className="text_input max-w-80 w-full outline-none spellcheck-false"
        type="text"
        placeholder="Username"
      />
        <input
        className="text_input max-w-80 w-full outline-none spellcheck-false"
        type="password"
        placeholder="Password"
      />
        <input
        className="text_input max-w-80 w-full outline-none spellcheck-false"
        type="password"
        placeholder="Confirm Password"
      />



       {/* Button for signup */}
      <Button>Sign Up</Button>
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