import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export type LocationFix = { latitude: number; longitude: number };

const SETTINGS_BUTTON = {
  text: "Open settings",
  onPress: () => Linking.openSettings(),
} as const;

/**
 * Resolves the device's current position for the host flow and the map's
 * locate FAB. Handles everything that can go wrong along the way:
 *  - location services (GPS) turned off      → guides the user to Settings
 *  - permission never asked                  → asks
 *  - permission permanently denied           → guides the user to Settings
 *  - provider failures (common on emulators) → retries once at low accuracy
 * Returns null when the user declined or the fix failed (UI stays usable).
 */
export async function getCurrentFix(): Promise<LocationFix | null> {
  try {
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
      Alert.alert(
        "Location is off",
        "Turn on location (GPS) in your device settings, then try again.",
        [SETTINGS_BUTTON, { text: "Cancel", style: "cancel" }],
      );
      return null;
    }

    let { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted" && canAskAgain) {
      const request = await Location.requestForegroundPermissionsAsync();
      status = request.status;
      canAskAgain = request.canAskAgain;
    }
    if (status !== "granted") {
      Alert.alert(
        "Location permission needed",
        canAskAgain
          ? "Allow location access so hangouts can be pinned around you."
          : "Location access is blocked for this app. Enable it in Settings → Apps → Functions → Permissions.",
        canAskAgain
          ? [{ text: "OK" }]
          : [SETTINGS_BUTTON, { text: "Cancel", style: "cancel" }],
      );
      return null;
    }

    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch {
      // Some devices/emulators fail at Balanced accuracy — retry once, low.
      const fallback = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      return {
        latitude: fallback.coords.latitude,
        longitude: fallback.coords.longitude,
      };
    }
  } catch (error) {
    console.warn("Failed to get location:", error);
    Alert.alert(
      "Couldn't get your location",
      "Your device's location provider is unavailable. Make sure location/GPS is on and try again.",
    );
    return null;
  }
}
