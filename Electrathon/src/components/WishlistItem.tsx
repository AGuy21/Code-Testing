import React from 'react';
import type { WishlistItem as WishlistItemType } from '../constants/data/wishlistData';

interface WishlistItemProps {
  item: WishlistItemType;
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const priorityColors = {
    High: 'bg-red-500/20 text-red-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Low: 'bg-blue-500/20 text-blue-400'
  };

  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
      <div>
        <p className="text-white text-sm font-mono mb-1">{item.name}</p>
        <span className={`text-[10px] px-1.5 py-0.5 rounded ${priorityColors[item.priority]}`}>
          {item.priority} Priority
        </span>
      </div>
      <span className="text-[#d4af37] text-sm font-mono">{item.price}</span>
    </div>
  );
}
