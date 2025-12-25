import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyber";
  className?: string;
  size?: "sm" | "md" | "lg";
  download?: string;
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  download,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#d4af37] text-[#0f3d2e] hover:bg-[#c29d2f] shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:-translate-y-0.5 rounded-lg",
    secondary:
      "bg-[#0f3d2e] text-white border border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-[#16503e] rounded-lg",
    outline:
      "bg-transparent border-2 border-[#d4af37]/40 text-white hover:border-[#d4af37] hover:bg-[#d4af37]/10 rounded-lg",
    ghost: "bg-transparent text-[#d4af37] hover:bg-[#d4af37]/10 rounded-lg",
    cyber:
      "bg-[#d4af37] text-black font-bold uppercase tracking-wider hover:bg-white hover:text-black clip-corner-br border-l-2 border-transparent hover:border-[#d4af37]",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" download={download}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
