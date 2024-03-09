/**
 * Represents a color library object containing color values for different themes.
 */
export default {
  Basic: {
    primary: "#e6060b", // Reddish orange
    secondary: "#FFFFFF", // White
    inactive: "#FFFFFF60",
    active: "#FFFFFF",

    text: "white",
    secondaryText: "black",
    background: "#141414", // Dark gray
    TabBarButtons: "#FFFFFF", // White

    income: "lime",
    expense: "yellow",
    first: "red",
    second: "orange",
    third: "yellow",
    other: "gray",

    gray: "#282828", // Dark gray
    gray60: "#202020", // Darker gray
    transparent: "rgba(0,0,0,0)", // Transparent
  },
  Oceanic: {
    primary: "#26C6DA", // Teal
    secondary: "#FFFFFF", // White
    inactive: "#FFFFFF60",
    active: "#FFFFFF",

    text: "#b5f4f1", // Light blue
    secondaryText: "#282828", // Light blue
    background: "#0F171E", // Dark blue
    TabBarButtons: "#FFFFFF", // White

    income: "#29B6F6", // Blue
    expense: "#ff8080", // Red
    first: "#5DADE2", // Blue
    second: "#2ECC71", // Green
    third: "#BDC3C7", // Light gray
    other: "#CFD7E2", // Light blue

    gray: "#282828", // Dark gray
    gray60: "#202020", // Darker gray
    transparent: "rgba(0,0,0,0)", // Transparent
  },
  Sunrise: {
    primary: "#FFEB3B", // Light yellow
    secondary: "#FFFFFF", // White
    inactive: "#FFFFFF60",
    active: "#FFFFFF",

    text: "#fafcb6", // Light yellow
    secondaryText: "#5D4037", // Dark brown
    background: "#282828", // Dark gray
    TabBarButtons: "#FFFFFF", // White

    income: "#FF9933", // Orange
    expense: "#F7CAC9", // Light pink
    first: "#ff8080", // Light red
    second: "#FF9933", // Orange
    third: "#FFEB3B", // Light yellow
    other: "#FFE0B2", // Light orange

    gray: "#424242", // Gray
    gray60: "#202020", // Darker gray
    transparent: "rgba(0,0,0,0)", // Transpare
  },
  Modern: {
    primary: "#FFFFFF60", // Very dark gray
    secondary: "#FFFFFF", // White
    inactive: "#FFFFFF60",
    active: "#FFFFFF",

    text: "white",
    secondaryText: "white", // Light blue
    background: "#1B1B1B", // Very dark gray
    TabBarButtons: "#FFFFFF", // White

    income: "#4CAF50", // Green
    expense: "#C62828", // Red
    first: "#29B6F6", // Blue
    second: "#4CAF50", // Green
    third: "#9E9E9E", // Light gray
    other: "#CFD7E2", // Light blue

    gray: "#282828", // Dark gray
    gray60: "#000000", // Black
    transparent: "rgba(0,0,0,0)", // Transparent
  },
  Island: {
    // TODO: Change the colors
    primary: "#00C853", // Dark teal (more prominent green)
    secondary: "#FFFFFF", // White (remains the same)
    inactive: "#FFFFFF60", // White with 60% opacity (remains the same)
    active: "#FFFFFF", // White (remains the same)

    text: "#b5f4f1", // Light blue (remains the same)
    secondaryText: "#282828", // Dark gray (remains the same)
    background: "#121A21", // Very dark blue (adjusted for a deeper tone)
    TabBarButtons: "#FFFFFF", // White (remains the same)

    income: "#00E08A", // Even lighter, cooler green (more prominent)
    expense: "#FFEA8A", // Light orange (remains the same)
    first: "#0070C0", // Dark saturated blue (adjusted for more contrast)
    second: "#2ECC71", // Green (remains the same for comparison)
    third: "#D3D3D3", // Light greenish-gray (subtle green hint)
    other: "#BDBDBD", // Light greenish-gray (subtle green hint)

    gray: "#777777", // Medium greenish-gray (stronger green presence)
    gray60: "#555555", // Darker greenish-gray (stronger green presence)
    transparent: "rgba(0,0,0,0)", // Transparent (remains the same)
  },
  NightSky: {
    primary: "#CFD7E2", // Dark blue
    secondary: "#FFFFFF", // White
    inactive: "#FFFFFF60",
    active: "#FFFFFF",

    text: "#99A3A4", // White
    secondaryText: "#CFD7E295", // Light blue
    background: "#282C34", // Dark blue
    TabBarButtons: "#FFFFFF", // White

    income: "#C62828", // Red
    expense: "#E03946", // Pink
    first: "#9B59B6", // Purple
    second: "#C62828", // Red
    third: "#34495E", // Dark blue
    other: "#7F8C8D", // Light gray

    gray: "#424242", // Gray
    gray60: "#000000", // Black
    transparent: "rgba(0,0,0,0)", // Transparent
  },
};
