
export function capitalizeFirstLetter(text: string): string {
    if (!text) return text; // Handle empty or undefined strings
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  