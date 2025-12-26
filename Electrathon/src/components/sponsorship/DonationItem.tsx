import type { Donator } from "../../constants/types/Donator";

export default function DonationItem({ donation }: { donation: Donator }) {
  const fullName = `${donation.first} ${donation.last}`;
  const itemsList = donation.items.join(", ");
  const amount = donation.dollars.startsWith("$") ? donation.dollars : `$${donation.dollars}`;

  return (
    <div className="flex justify-between items-center p-3 bg-white/5 border border-[#d4af37]/10 rounded-md hover:border-[#d4af37]/30 transition-colors">
      <div>
        <p className="text-white font-bold">{fullName}</p>
        <p className="text-white/60 text-sm">Donated: {itemsList}</p>
      </div>
      <span className="text-[#d4af37] font-mono">{amount}</span>
    </div>
  );
}
