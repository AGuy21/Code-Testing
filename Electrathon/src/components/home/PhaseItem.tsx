interface PhaseItemProps {
  phase: string;
  title: string;
  description: string;
}

export default function PhaseItem({ phase, title, description }: PhaseItemProps) {
  return (
    <div className="border-l-2 border-[#d4af37]/30 pl-6">
      <h3 className="text-[#d4af37] font-mono text-xs mb-1">{phase}</h3>
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-white/70 text-sm font-light">
        {description}
      </p>
    </div>
  );
}
