import type { ReactNode } from 'react';
import { Colors } from '../constants/colors';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'gradient';
}

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-lg p-6 transition-all duration-300';
  
  const variants = {
    default: 'bg-white/5 backdrop-blur-sm hover:bg-white/10',
    bordered: 'bg-white/5 backdrop-blur-sm border-2 hover:border-opacity-80',
    gradient: 'bg-gradient-to-br from-white/10 to-transparent border-2 hover:border-opacity-80',
  };

  const borderStyle = variant === 'bordered' || variant === 'gradient' 
    ? { borderColor: `${Colors.primary}33` }
    : {};

  const hoverBorderStyle = variant === 'bordered' || variant === 'gradient'
    ? { ['--hover-border-color' as string]: `${Colors.primary}66` }
    : {};

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ ...borderStyle, ...hoverBorderStyle }}
    >
      {children}
    </div>
  );
}
