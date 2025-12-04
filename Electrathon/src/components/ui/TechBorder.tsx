import React from 'react';

interface TechBorderProps {
  side?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export default function TechBorder({ side = 'right', className = "", children }: TechBorderProps) {
  const isRight = side === 'right';
  
  return (
    <div className={`relative py-4 ${isRight ? 'border-r-2 pr-8 md:pr-12 text-right' : 'border-l-2 pl-8 md:pl-12 text-left'} border-[#d4af37]/30 ${className}`}>
      {/* Corner Squares */}
      <div className={`absolute top-0 ${isRight ? 'right-0 translate-x-[5px]' : 'left-0 -translate-x-[5px]'} w-2 h-2 bg-[#d4af37]`}></div>
      <div className={`absolute bottom-0 ${isRight ? 'right-0 translate-x-[5px]' : 'left-0 -translate-x-[5px]'} w-2 h-2 bg-[#d4af37]`}></div>
      
      {children}
    </div>
  );
}
