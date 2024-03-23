/**
 * This constants folder should house all global types to be used throughout
 * the application with ease
 */

/**
 * These are the item props they contain:
 * - @type {string} frequency - The frequency of the item
 * - @type {number} amount - The amount of the item
 * - @type {string} name - The name of the item
 * - @type {string} id - The id of the item
 */
type moneyDataItemProps = {
  frequency: string;
  amount: number;
  name: string;
  id: string;
};

/**
 * These are the array of props they contain:
 * This holds all the objects in one array
 *  @type {string} frequency - The frequency of the item
 *  @type {number} amount - The amount of the item
 *  @type {string} name - The name of the item
 *  @type {string} id - The id of the item
 */
interface moneyDataArrayProps extends Array<moneyDataItemProps> {}

type ColorTypes = {
  primary: string;
  secondary: string;
  text: string;
  secondaryText: string;
  background: string;

  inactive: string;
  active: string;

  TabBarButtons: string;

  income: string;
  expense: string;
  first: string;
  second: string;
  third: string;
  other: string;

  monthly: string;
  bi_weekly: string;
  weekly: string;

  gray: string;
  gray60: string;
  transparent: string;
};

export { moneyDataItemProps, moneyDataArrayProps, ColorTypes };


