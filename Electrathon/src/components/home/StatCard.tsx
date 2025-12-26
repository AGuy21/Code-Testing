interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="p-6 bg-white/5 rounded-lg border-2 border-[#d4af37]/30 text-center hover:border-[#d4af37] hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/30 relative overflow-hidden speed-lines">
      {/* Racing stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
      
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <div className="text-4xl font-bold text-[#d4af37] mb-2">{value}</div>
      <div className="text-sm text-white/70 uppercase tracking-wide">{label}</div>
    </div>
  );
}
