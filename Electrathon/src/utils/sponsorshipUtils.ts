import { sponsorshipTiers } from "../constants/data/sponsorshipData";
import type { SponsorshipTier } from "../constants/types/SponsorshipTier";

export function getTierFromAmount(amount: string | number): SponsorshipTier | null {
  // Remove any non-numeric characters (like '$' or ',')
  const numericAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.]/g, '')) 
    : amount;

  if (isNaN(numericAmount)) return null;

  // Check tiers from highest to lowest
  if (numericAmount >= 10000) return sponsorshipTiers.find(t => t.name === "Platinum") || null;
  if (numericAmount >= 5000) return sponsorshipTiers.find(t => t.name === "Gold") || null;
  if (numericAmount >= 1000) return sponsorshipTiers.find(t => t.name === "Silver") || null;
  if (numericAmount >= 500) return sponsorshipTiers.find(t => t.name === "Bronze") || null;

  return null;
}
