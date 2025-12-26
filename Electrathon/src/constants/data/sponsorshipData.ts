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
  founding: "Founded in 2020 our mission is to foster knowledge and hands on experience in motorsports and electric vehicles for students of Allen D Nease High School. This year we aim to compete in at least 3 more races and at least 4 in the next season as well as promoting the growth of Electrathon in St Johns county where we have encouraged the growth of two other teams and Northeast Florida where opportunities we have created have helped to inspire teams in Duval and other counties as well.",
  model: "We operate on a 'Student-Run, Mentor-Guided' model. Every weld, wire, and line of code is executed by students. Our mentors provide safety oversight and industry wisdom, but the engineering decisions are ours.",
  ethos: "Innovation through iteration. We believe that failure is just data. We test, we break, we analyze, and we rebuild better. Our goal isn't just to win races, but to build the engineers of tomorrow."
};
