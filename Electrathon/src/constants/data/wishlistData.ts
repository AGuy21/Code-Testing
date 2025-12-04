export interface WishlistItem {
  name: string;
  price: string;
  priority: "High" | "Medium" | "Low";
  link: string;
}

export const wishlistItems: WishlistItem[] = [
  {
    name: "Heavy Duty Pop-up Tent",
    price: "$250",
    priority: "High",
    link: "#"
  },
  {
    name: "Wireless Headset System",
    price: "$150",
    priority: "High",
    link: "#"
  },
  {
    name: "Portable SSD (1TB)",
    price: "$80",
    priority: "Medium",
    link: "#"
  },
  {
    name: "Metric Tool Set",
    price: "$120",
    priority: "Medium",
    link: "#"
  },
  {
    name: "GoPro Mounting Kit",
    price: "$45",
    priority: "Low",
    link: "#"
  }
];

export const beneficiaries = [
  "Local Engineering Firms",
  "Alumni Donors",
  "Parent Booster Club",
  "Community Partners"
];
