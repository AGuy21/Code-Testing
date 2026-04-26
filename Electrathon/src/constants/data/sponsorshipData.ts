import type { SponsorshipTier } from "../types/SponsorshipTier";

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "Platinum",
    price: "$10,000/year",
    benefits: [
      "Completely sponsors a car",
      "Your logo on the car hood and sides",
      "Logo featured on website",
      "Mentioned in all race posts",
      "Mentioned 2 times per month through team social media",
      "Mentioned in other media as allowed",
      "Logo prominently displayed on team shirts",
      "Provided banner up to 6'x10' displayed at events"
    ],
    color: "#00b4d8" // Platinum (Blue)
  },
  {
    name: "Gold",
    price: "$5,000/year",
    benefits: [
      "Logo on hood of car",
      "Larger logo on website",
      "Mentioned in all race posts",
      "Mentioned 2 times per month on social media",
      "Mentioned in all other media as allowed",
      "Small logo on team shirts",
      "Provided banner up to 4'x6' displayed at events"
    ],
    color: "#d4af37" // Gold
  },
  {
    name: "Silver",
    price: "$1,000/year",
    benefits: [
      "Larger logo on rear quarter of car",
      "Logo on website",
      "Mentioned once per race in race posts",
      "Mentioned one time per month in social media",
      "Name listed on team shirts",
      "Provided banner up 2'x3' displayed at events"
    ],
    color: "#c0c0c0" // Silver
  },
  {
    name: "Bronze",
    price: "$500/year",
    benefits: [
      "Small logo on car between number and wheels",
      "Logo on website",
      "Mentioned once per race in race posts on social media"
    ],
    color: "#cd7f32" // Bronze
  }
];

export const teamEthos = {
  founding: "Started in 2020, our club gives students hands-on experience with electric vehicle design, fabrication, and race-day teamwork. This season, we’re focused on more races, stronger performance, and growing the program around St. Johns County.",
  model: "We’re student-led, with mentors helping us stay safe and on track. Students do the design, builds, and race prep, while teachers support with guidance and resources.",
  ethos: "We learn by doing. That means testing ideas, fixing mistakes, and making each car better than the last. Winning feels great, but the main goal is building skills and confidence."
};
