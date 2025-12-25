import React from 'react';
import Button from './ui/Button';
import type { SponsorshipTier } from '../constants/data/sponsorshipData';

interface SponsorCardProps {
  tier: SponsorshipTier;
}

export default function SponsorCard({ tier }: SponsorCardProps) {
  return (
    <div className="bg-[#0a2a20] border border-[#d4af37]/20 p-6 flex flex-col relative group hover:border-[#d4af37] transition-colors h-full">
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: tier.color }}></div>
      
      <h4 className="text-xl font-bold text-white mb-2 uppercase">{tier.name}</h4>
      <p className="text-[#d4af37] font-mono text-lg mb-4">{tier.price}</p>
      
      {tier.spots && (
        <span className="absolute top-4 right-4 text-[10px] bg-[#d4af37]/10 text-[#d4af37] px-2 py-1 border border-[#d4af37]/20">
          {tier.spots}
        </span>
      )}
      
      <ul className="space-y-2 mb-6 flex-grow">
        {tier.benefits.map((benefit, i) => (
          <li key={i} className="text-white/60 text-xs font-mono flex items-start gap-2">
            <span className="text-[#d4af37] mt-0.5">+</span>
            {benefit}
          </li>
        ))}
      </ul>
      
      <Button 
        href="mailto:John.Beale@stjohns.k12.fl.us" 
        variant="outline" 
        size="sm" 
        className="w-full border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-xs"
      >
        Inquire
      </Button>
    </div>
  );
}
