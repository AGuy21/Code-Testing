import React from 'react';

interface TeamRoleCardProps {
  icon: string;
  title: string;
  subtitle: string;
}

export default function TeamRoleCard({ icon, title, subtitle }: TeamRoleCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#0f3d2e] border border-[#d4af37]/20 clip-corner-br hover:border-[#d4af37] transition-colors group">
      <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      <div>
        <h4 className="font-bold text-white font-mono uppercase text-sm">{title}</h4>
        <p className="text-xs text-[#d4af37]/70">{subtitle}</p>
      </div>
    </div>
  );
}
