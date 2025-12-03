import { Colors } from "./colors";
import type { TierStyle } from "./types/TierStyles";

export const tierStyles: Record<"Terrestrial" | "Stellar" | "Galactic" | "default", TierStyle> = {
    Terrestrial: {
      border: Colors.terrestrial,
      ribbonBg: "linear-gradient(90deg,#8B5E3C,#C78C46)",
      text: "#fff",
    },
    Stellar: {
      border: Colors.stellar,
      ribbonBg: "linear-gradient(90deg,#60A5FA,#60A5FA)",
      text: "#fff",
      scale: 1.02,
      shadow: `0 8px 20px ${Colors.stellar}40`,
    },
    Galactic: {
      border: Colors.galactic,
      ribbonBg: `linear-gradient(90deg, ${Colors.galactic}, ${Colors.primary})`,
      text: "#fff",
      scale: 1.06,
      shadow: `0 10px 35px ${Colors.galactic}55`,
      borderWidth: 2,
    },
    default: {
      border: Colors.primary,
      ribbonBg: "transparent",
      text: "#fff",
      scale: 1,
      shadow: `0 6px 20px ${Colors.primary}40`,
      borderWidth: 1,
    },
  };