import { Platform } from "react-native";

type ExpoNotifications = typeof import("expo-notifications");

// expo-notifications ships native code (ExpoPushTokenManager). A dev build
// compiled before the package was installed doesn't have it, so the require
// is guarded — the app keeps running with push disabled until rebuilt.
declare const require: (id: "expo-notifications") => ExpoNotifications;

let cached: ExpoNotifications | null | undefined;

function notifications(): ExpoNotifications | null {
  if (cached === undefined) {
    try {
      cached = require("expo-notifications");
    } catch (error) {
      console.warn(
        "expo-notifications unavailable — rebuild the dev client " +
          "(npx expo prebuild --clean && npm run android) to enable push.",
        error,
      );
      cached = null;
    }
  }
  return cached;
}

// Present FCM notifications while the app is foregrounded. Safe at module
// scope: a no-op when the native module is missing.
const Notifications = notifications();
if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/**
 * Fires `callback(conversationId)` when the user taps a chat notification
 * (deep-link into the thread). Returns an unsubscribe function; a no-op
 * when the native module is unavailable.
 */
export function addOnNotificationTap(
  callback: (conversationId: string) => void,
): () => void {
  const Notifications = notifications();
  if (!Notifications) return () => undefined;
  const subscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const conversationId =
        response.notification.request.content.data?.conversationId;
      if (typeof conversationId === "string") callback(conversationId);
    });
  return () => subscription.remove();
}

/**
 * Asks for notification permission (once) and returns this device's FCM
 * token — the token Cloud Functions targets with admin.messaging. Returns
 * null when the user declines, the platform lacks Play services, or the
 * native module isn't available yet.
 */
export async function getFcmToken(): Promise<string | null> {
  const Notifications = notifications();
  if (!Notifications) return null;
  try {
    const settings = await Notifications.getPermissionsAsync();
    let granted =
      settings.granted ||
      settings.ios?.status ===
        Notifications.IosAuthorizationStatus.PROVISIONAL;
    if (!granted) {
      const request = await Notifications.requestPermissionsAsync();
      granted = request.granted;
    }
    if (!granted) return null;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("messages", {
        name: "Messages",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    // getDevicePushTokenAsync returns the native FCM token on Android.
    const token = await Notifications.getDevicePushTokenAsync();
    return typeof token.data === "string" ? token.data : null;
  } catch (error) {
    console.warn("Failed to get FCM token:", error);
    return null;
  }
}