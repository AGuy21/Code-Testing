/**
 * A formatter for leading zeros, makes sure all formatted integers have 2 digits
 * 
 * @type {Intl.NumberFormat}
 */
const LEADING_ZERO_FORMATTER: Intl.NumberFormat = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
/**
 * This formats the given duration by turning the seconds into hours, minutes then the left over into seconds.
 * After it gets the hours, minmutes, and seconds it will return a formatted string of the duration
 * 
 * @param duration -Takes in the duartion in seconds as a number
 * @returns - The formatted duration as a string
 *
 * @example
 * const formattedDuration = formatDuratio(4343) // outputs "1:12:23"
 * const formattedDuration = formatDuratio(938) // outputs "15:38"
 * const formattedDuration = formatDuratio(120) // outputs "2:00"
 */
export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const seconds = duration % 60;

  // If there are hours in the duration it will format with hours
  if (hours > 0) {
    return (
      hours +
      ":" +
      LEADING_ZERO_FORMATTER.format(minutes) +
      ":" +
      LEADING_ZERO_FORMATTER.format(seconds)
    );
    // if there aren't hours in the duration it wont format with hours
  } else {
    return minutes + ":" + LEADING_ZERO_FORMATTER.format(seconds);
  }
}
