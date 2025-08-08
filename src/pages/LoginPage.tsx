import Button from "../components/Button";

const LoginPage = () => {
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
      <Button  to="/profile" className="w-25">Login</Button>
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
