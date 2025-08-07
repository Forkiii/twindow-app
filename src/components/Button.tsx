import { Link } from "react-router-dom";


type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
};

const Button = ({ children, className,to, onClick }: ButtonProps) => {
  const classes = `button ${className || ""}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

    return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
export default Button;
