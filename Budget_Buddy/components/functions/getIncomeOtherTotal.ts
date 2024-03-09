import calculateMontlyTotal from "./calculateMontlyTotal";

/**
 * Calculates the total of the last three income data entries.
 *
 * @param {any[]} incomeData - An array of income data entries.
 * @returns The total of the last income data entries (other).
 */
export default function getIncomeOtherTotal(incomeData: any[]) {
  const lastThree = incomeData.slice(3, incomeData.length);
  let otherTotal = 0;

  for (let i = 0; i < lastThree.length; i++) {
    otherTotal += calculateMontlyTotal(
      lastThree[i].amount,
      lastThree[i].frequency
    );
  }

  return otherTotal;
}
