interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-3xl font-bold text-[#d4af37]">{value}</div>
      <div className="text-sm text-white/70 mt-1">{label}</div>
    </div>
  );
}
