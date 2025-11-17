import type { ReactNode } from "react";
import { Colors } from "../constants/colors";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "gradient";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const baseStyles =
    "rounded-lg p-6 transition-all duration-300 backdrop-blur-sm";

  const variants = {
    default: "bg-white/5 hover:bg-white/10 border border-white/10",
    bordered: "bg-white/5 hover:bg-white/10 border-2",
    gradient: "bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border-2",
  };

  const borderStyle =
    variant === "bordered" || variant === "gradient"
      ? {
          borderColor: `${Colors.primary}40`,
        }
      : {};

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ ...borderStyle }}
    >
      {children}
    </div>
  );
}
