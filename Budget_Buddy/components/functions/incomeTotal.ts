/**
 * Calculates the total income based on the provided income array.
 * @param incomeArray - An array of income objects.
 * @returns The total income as a number.
 */

export default function incomeTotal(incomeArray: any[]) {
  let incomeTotal = 0;

  for (let i = 0; i < incomeArray.length; i++) {
    if (incomeArray[i].frequency === "Weekly") {
      incomeTotal += incomeArray[i].amount * 4;
    } else if (incomeArray[i].frequency === "Bi-Weekly") {
      incomeTotal += incomeArray[i].amount * 2;
    } else if (incomeArray[i].frequency === "Monthly") {
      incomeTotal += incomeArray[i].amount;
    }
  }

  return incomeTotal;
}
