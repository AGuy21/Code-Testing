/**
 * Calculates the weekly total based on the given number and frequency.
 * @param num - The number to calculate the weekly total for.
 * @param frequency - The frequency of the number (Weekly, Bi-Weekly, Monthly).
 * @returns The calculated weekly total.
 */
export default function calculateMontlyTotal(num: number, frequency: string) {
    if (frequency === "Weekly") {
      return num / 4;
    } else if (frequency === "Bi-Weekly") {
      return num / 2;
    } else if (frequency === "Monthly") {
      return num;
    }
  }
  