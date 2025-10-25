interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center hover:border-[#d4af37]/50 hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <div className="text-4xl font-bold text-[#d4af37] mb-2">{value}</div>
      <div className="text-sm text-white/70 uppercase tracking-wide">{label}</div>
    </div>
  );
}
