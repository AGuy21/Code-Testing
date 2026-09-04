/**
 * Dynamic Expo config — the source of truth for the Functions app.
 *
 * WHY THIS FILE EXISTS:
 * `app.json` is tracked but ALSO listed in `.gitignore`, so edits to it are
 * silently skipped by git — and Expo CLI gives `app.config.ts` precedence
 * over `app.json` when both exist. Treat this file as the single source of
 * truth for the app/native configuration.
 *
 * GOOGLE MAPS:
 * - Android: `android.config.googleMaps.apiKey` is baked into the native build
 *   (react-native-maps reads it from AndroidManifest.xml at runtime).
 * - iOS: when `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` is set, the key is also
 *   injected as `ios.config.googleMapsApiKey` (Maps SDK for iOS). Without it,
 *   iOS falls back to Apple Maps, which needs no key.
 *
 * The key is compile-time native config — after changing it, rebuild:
 *   npx expo prebuild --clean
 *   npm run android
 */

import type { ExpoConfig } from "expo/config";

const envMapsKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

// Development fallback so the map renders out of the box on fresh clones.
// For production builds, set EXPO_PUBLIC_GOOGLE_MAPS_API_KEY in `.env.local`
// and restrict the key in Google Cloud Console (see README.md → Google Maps).
const androidMapsApiKey = envMapsKey ?? "AIzaSyCTNjI2zqNX78MaqYNjU1L9_0chT_QAuHQ";

const config: ExpoConfig = {
  scheme: "functions",
  name: "Functions",
  slug: "Functions",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    ...(envMapsKey ? { config: { googleMapsApiKey: envMapsKey } } : {}),
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    config: {
      googleMaps: {
        apiKey: androidMapsApiKey,
      },
    },
    permissions: [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
    ],
    package: "com.anonymous.Functions",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "@react-native-vector-icons/ionicons",
    "@react-native-vector-icons/material-design-icons",
    [
      "expo-font",
      {
        fonts: [
          "./assets/Manrope/Manrope-Bold.ttf",
          "./assets/Manrope/Manrope-ExtraBold.ttf",
          "./assets/Manrope/Manrope-ExtraLight.ttf",
          "./assets/Manrope/Manrope-Light.ttf",
          "./assets/Manrope/Manrope-Medium.ttf",
          "./assets/Manrope/Manrope-Regular.ttf",
          "./assets/Manrope/Manrope-SemiBold.ttf",
        ],
      },
    ],
    "expo-router",
    "@clerk/expo",
    "expo-secure-store",
    "expo-web-browser",
    "@react-native-community/datetimepicker",
    [
      "expo-location",
      {
        locationWhenInUsePermission:
          "Functions uses your location to show hangouts near you.",
      },
    ],
  ],
};

export default config;
