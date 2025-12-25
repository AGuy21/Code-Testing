export interface Donation {
  donor: string;
  item: string;
  amount: string;
}

export const recentDonations: Donation[] = [
  {
    donor: "John Smith",
    item: "Metric Wrench Set",
    amount: "$120"
  },
  {
    donor: "Sarah Connor",
    item: "Safety Equipment",
    amount: "$250"
  },
  {
    donor: "Tech Solutions Inc.",
    item: "Battery Management System",
    amount: "$500"
  }
];

export const beneficiaries = [
  "Supermarket Solutions"
];
