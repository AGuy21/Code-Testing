import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Container({
  children,
  className = "",
  size = "xl",
}: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-[1400px]", // Matching the original racing-container
    full: "max-w-full",
  };

  return (
    <div
      className={`${sizes[size]} mx-auto px-6 sm:px-8 2xl:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
