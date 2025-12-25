export interface Donation {
  donor: string;
  item: string;
  amount: string;
}

export default function DonationItem({ donation }: { donation: Donation }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white/5 border border-[#d4af37]/10 rounded-md hover:border-[#d4af37]/30 transition-colors">
      <div>
        <p className="text-white font-bold">{donation.donor}</p>
        <p className="text-white/60 text-sm">Donated: {donation.item}</p>
      </div>
      <span className="text-[#d4af37] font-mono">{donation.amount}</span>
    </div>
  );
}
