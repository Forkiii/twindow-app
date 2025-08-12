import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  to?: string; // if present, render a Link
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // more specific type
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  to,
  onClick,
  type = "button",
}) => {
  const classes = `button bg-gradient-to-r 
    from-[var(--color-primary)] to-[var(--color-bg)]
    hover:from-[var(--color-secondary)] hover:to-[var(--color-accent)]
    transition-colors duration-700 ease-in-out ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type={type}>
      {children}
    </button>
  );
};

export default Button;
