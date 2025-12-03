import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Colors } from "../../constants/colors";

interface NavButtonProps {
  to: string;
  isPageActive: boolean;
  onHover?: (hovered: boolean) => void;
  children: ReactNode;
}

export default function NavButton({
  to,
  isPageActive,
  onHover,
  children,
}: NavButtonProps) {
  return (
    <NavLink
      to={to}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="relative group inline-block"
    >
      {({ isActive }) => {
        const active = isActive || isPageActive;
        return (
          <div className="relative">
            <span
              className={`relative z-10 block px-8 py-3 text-base font-semibold tracking-[0.15em] transition-all duration-300 ${
                active
                  ? "scale-110 text-white"
                  : "text-indigo-200/90 group-hover:text-white group-hover:scale-105"
              }`}
            >
              {children}
            </span>

            {active && (
              <>
                <div
                  className="absolute inset-0 rounded-full p-0.5 bg-linear-to-r from-indigo-300 via-purple-400 to-pink-400 -z-10"
                  style={{
                    boxShadow: `0 0 20px ${Colors.purpleShadow}`,
                  }}
                >
                  <div
                    className="absolute inset-0.5 rounded-full"
                    style={{ backgroundColor: Colors.background }}
                  />
                </div>
                <div
                  className="absolute inset-0 rounded-full blur-sm -z-20 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-60"
                  style={{
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
              </>
            )}

            {!active && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 origin-center group-hover:scale-x-100 scale-x-0 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400"
                style={{ boxShadow: `0 0 8px ${Colors.primary}` }}
              />
            )}
          </div>
        );
      }}
    </NavLink>
  );
}
