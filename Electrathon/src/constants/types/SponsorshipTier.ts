export interface SponsorshipTier {
  name: string;
  price: string;
  spots?: string; // e.g. "Limited to 2"
  benefits: string[];
  color: string; // Hex code for accent
}
