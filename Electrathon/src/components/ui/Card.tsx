import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "racing" | "checkered" | "gradient" | "glass";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const baseStyles =
    "rounded-lg p-6 transition-all duration-300 backdrop-blur-sm relative overflow-hidden";

  const variants = {
    default: "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#d4af37]/30",
    glass: "bg-black/20 border border-white/5 hover:bg-black/30 backdrop-blur-md",
    racing: "bg-white/5 border-y border-white/10 racing-border hover:bg-white/10",
    checkered: "bg-white/5 checkered-border hover:bg-white/10",
    gradient: "bg-gradient-to-br from-[#0f3d2e] to-[#0a2a20] border border-[#d4af37]/20 hover:border-[#d4af37]/50",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
