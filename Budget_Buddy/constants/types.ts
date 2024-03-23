/**
 * This constants folder should house all global types to be used throughout
 * the application with ease
 */
type moneyDataItemProps = {
  frequency: string;
  amount: number;
  name: string;
};

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


