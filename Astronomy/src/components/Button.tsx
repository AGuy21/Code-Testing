import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Colors } from "../constants/colors";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center inline-block hover:-translate-y-1";

  const variantStyles = {
    primary: "",
    outline: "border-2 text-white hover:bg-white/5",
  };

  const style =
    variant === "primary"
      ? {
          backgroundColor: Colors.primary,
          color: Colors.background,
          boxShadow: `0 4px 14px ${Colors.primary}40`,
        }
      : {
          borderColor: Colors.primary,
          boxShadow: `0 0 10px ${Colors.primary}20`,
        };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} style={style}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName} style={style}>
      {children}
    </button>
  );
}
