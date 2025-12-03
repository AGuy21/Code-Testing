import type { ReactNode } from "react";

interface SectionPanelProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export default function SectionPanel({ 
  children, 
  className = "",
  icon,
  title,
  subtitle,
}: SectionPanelProps) {
  return (
    <div className={`relative bg-indigo-950/20 rounded-3xl p-8 border border-indigo-500/10 ${className}`}>
      {(icon || title || subtitle) && (
        <div className="flex items-center gap-3 mb-8 border-b border-indigo-500/20 pb-4">
          {icon && <span className="text-2xl shrink-0">{icon}</span>}
          <div>
            {title && <h3 className="text-2xl font-bold leading-tight">{title}</h3>}
            {subtitle && <p className="text-sm opacity-70 mt-1">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
