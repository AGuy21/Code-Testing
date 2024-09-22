
/**
 * A formatter for relative time strings, such as "5 minutes ago".
 * 
 * @type {Intl.RelativeTimeFormat}
 */
const formatter: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(undefined, {
  numeric: "always",
});

/**
* Represents the divisions of time used for formatting relative time.
* Each division contains an amount of time and its corresponding unit.
* 
* @type {{ amount: number; name: Intl.RelativeTimeFormatUnit }[]}
*/
const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, name: "seconds" },  // 60 seconds in a minute
  { amount: 60, name: "minutes" },  // 60 minutes in an hour
  { amount: 24, name: "hours" },    // 24 hours in a day
  { amount: 7, name: "days" },      // 7 days in a week
  { amount: 4.34524, name: "weeks" }, // Approximately 4.345 weeks in a month
  { amount: 12, name: "months" },   // 12 months in a year
  { amount: Number.POSITIVE_INFINITY, name: "years" }, // Infinite amount of time for years
];

/**
* Formats a given date into a human-readable "time ago" string.
* 
* @param {Date} date - The date to format. It should be a Date object representing the past time.
* @returns - A string representing how long ago the date was in a relative format (e.g., "5 minutes ago").
* 
* @example
* const pastDate = new Date(Date.now() - 300000); // 5 minutes ago
* console.log(formatTimeAgo(pastDate)); // Outputs: "5 minutes ago"
*/
export function formatTimeAgo(date: Date) {
  // Calculate the duration in seconds from the given date to now
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  // Iterate through the divisions to find the appropriate time unit
  for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      // If the duration is less than the current division's amount, format and return
      if (Math.abs(duration) < division.amount) {
          return formatter.format(Math.round(duration), division.name);
      }
      // Divide the duration by the current division's amount to move to the next larger unit
      duration /= division.amount;
  }
}
