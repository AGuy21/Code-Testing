export interface SponsorshipTier {
  name: string;
  price: string;
  spots?: string; // e.g. "Limited to 2"
  benefits: string[];
  color: string; // Hex code for accent
}

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "Title Sponsor",
    price: "Contact for Pricing",
    spots: "Exclusive (1 Spot)",
    benefits: [
      "Large Logo on Vehicle Hood",
      "Primary Branding on Team Apparel",
      "VIP Access to Race Events",
      "Social Media Takeover",
      "Dedicated Press Release"
    ],
    color: "#d4af37" // Gold
  },
  {
    name: "Platinum",
    price: "$1,000+",
    spots: "Limited Availability",
    benefits: [
      "Large Logo on Vehicle Side",
      "Logo on Team Shirts",
      "Social Media Shoutouts",
      "Website Feature",
      "Signed Team Photo"
    ],
    color: "#e5e7eb" // Silver-ish
  },
  {
    name: "Gold",
    price: "$500",
    benefits: [
      "Medium Logo on Vehicle",
      "Name on Team Shirts",
      "Social Media Mention",
      "Website Listing"
    ],
    color: "#d4af37"
  },
  {
    name: "Silver",
    price: "$250",
    benefits: [
      "Small Logo on Vehicle",
      "Website Listing",
      "Social Media Mention"
    ],
    color: "#cd7f32" // Bronze/Copper
  },
  {
    name: "Bronze",
    price: "$100",
    benefits: [
      "Name on Vehicle",
      "Website Listing"
    ],
    color: "#a16207" // Brown
  }
];

export const teamEthos = {
  founding: "Founded in 2018, Nease Electrathon began with a simple question: How far can we go on a single charge? What started as a small club in a garage has grown into a premier high school engineering team.",
  model: "We operate on a 'Student-Run, Mentor-Guided' model. Every weld, wire, and line of code is executed by students. Our mentors provide safety oversight and industry wisdom, but the engineering decisions are ours.",
  ethos: "Innovation through iteration. We believe that failure is just data. We test, we break, we analyze, and we rebuild better. Our goal isn't just to win races, but to build the engineers of tomorrow."
};
