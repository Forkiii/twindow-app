import { Link } from "react-router-dom";


type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
};

const Button = ({ children, className,to, onClick }: ButtonProps) => {
  const classes = `button bg-gradient-to-r 
             from-[var(--color-primary)] to-[var(--color-bg)]
              hover:from-[var(--color-secondary)] hover:to-[var(--color-accent)]
             transition-colors duration-700 ease-in-out ${className || ""}`;

  if (to) {
    return (
      <Link to={to} className= {`${classes}`}  >
        {children}
      </Link>
    );
  }

    return (
    <button onClick={onClick} className={`${classes}` }>
      {children}
    </button>
  );
};
export default Button;
