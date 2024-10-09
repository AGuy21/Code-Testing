/**
 * - This is a utility function used to take in text and return the text with capitalization int he front
 *
 * @param text - The text input that will be formatted
 * @returns {text} - The formatted string with first letter capitalized
 */

export function capitalizeFirstLetter(text: string): string {
  if (!text) return text; // Handle empty or undefined strings
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); // return capitalized text
}
