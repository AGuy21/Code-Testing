/**
 * Google Places Text Search (New) — used by the host flow to resolve a typed
 * address or place name into coordinates. Uses the same key as the Maps SDK
 * (enable "Places API (New)" in Google Cloud Console alongside the Maps SDK).
 *
 * Expo inlines EXPO_PUBLIC_* vars from .env at bundle time via process.env.
 */
import { Platform } from "react-native";

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

// A key restricted to "Android apps" rejects REST calls unless they identify
// the app. Defaults to the local debug keystore; set the env var to your
// release SHA-1 for production builds.
const ANDROID_CERT_SHA1 =
  process.env.EXPO_PUBLIC_ANDROID_CERT_SHA1 ?? "5E8F16062EA3CD2C4A0D547876BAA6F38CABF625";

function placesHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY ?? "",
    ...(Platform.OS === "android"
      ? { "X-Android-Package": "com.anonymous.Functions", "X-Android-Cert": ANDROID_CERT_SHA1 }
      : {}),
    ...extra,
  };
}

export interface PlaceResult {
  /** Formatted one-line address, e.g. "1100 S Congress Ave, Austin, TX". */
  label: string;
  location: { latitude: number; longitude: number };
}

interface PlacesApiResponse {
  places?: Array<{
    displayName?: { text?: string };
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
  }>;
}

/** Resolve a typed address / place name into up to `max` coordinate results.
 * Throws on API errors (e.g. 403 when Places API (New) isn't enabled for the
 * key) so callers can surface a hint instead of showing an empty list. */
export async function searchPlaces(query: string, max = 5): Promise<PlaceResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: placesHeaders({
        "Content-Type": "application/json",
        // Field mask limits the response (and billing) to what we render.
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.location",
      }),
      body: JSON.stringify({ textQuery: trimmed, pageSize: max }),
    },
  );
  if (!response.ok) {
    const hint =
      response.status === 403
        ? "enable 'Places API (New)' and allow this app's package + SHA-1 on the key"
        : `HTTP ${response.status}`;
    throw new Error(`Places API request failed — ${hint}`);
  }
  const data = (await response.json()) as PlacesApiResponse;
  const places = data.places ?? [];
  const results: PlaceResult[] = [];
  for (const place of places) {
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      continue;
    }
    results.push({
      label: place.formattedAddress ?? place.displayName?.text ?? "Unnamed place",
      location: { latitude, longitude },
    });
  }
  return results;
}

export interface PlaceSuggestion {
  placeId: string;
  /** Main line, e.g. "Zilker Park". */
  primary: string;
  /** Context line, e.g. "Austin, TX, USA". */
  secondary: string;
}

/** One token per typing session groups autocomplete + the final details call into a single billed session. */
export function newPlacesSessionToken(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Autocomplete (New): suggestions as the user types. Throws like searchPlaces. */
export async function autocompletePlaces(
  input: string,
  sessionToken: string,
  near?: { latitude: number; longitude: number },
): Promise<PlaceSuggestion[]> {
  const trimmed = input.trim();
  if (trimmed.length < 2) return [];
  const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: placesHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      input: trimmed,
      sessionToken,
      ...(near
        ? { locationBias: { circle: { center: near, radius: 30000 } } }
        : {}),
    }),
  });
  if (!response.ok) {
    const hint =
      response.status === 403
        ? "enable 'Places API (New)' and allow this app's package + SHA-1 on the key"
        : `HTTP ${response.status}`;
    throw new Error(`Places autocomplete failed — ${hint}`);
  }
  const data = (await response.json()) as {
    suggestions?: Array<{
      placePrediction?: {
        placeId?: string;
        structuredFormat?: {
          mainText?: { text?: string };
          secondaryText?: { text?: string };
        };
        text?: { text?: string };
      };
    }>;
  };
  const out: PlaceSuggestion[] = [];
  for (const item of data.suggestions ?? []) {
    const prediction = item.placePrediction;
    if (!prediction?.placeId) continue;
    out.push({
      placeId: prediction.placeId,
      primary:
        prediction.structuredFormat?.mainText?.text ??
        prediction.text?.text ??
        "Unnamed place",
      secondary: prediction.structuredFormat?.secondaryText?.text ?? "",
    });
  }
  return out;
}

/** Resolves a chosen suggestion into coordinates (ends the billing session). */
export async function getPlaceDetails(
  suggestion: PlaceSuggestion,
  sessionToken: string,
): Promise<PlaceResult> {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(
      suggestion.placeId,
    )}?sessionToken=${encodeURIComponent(sessionToken)}`,
    {
      headers: placesHeaders({ "X-Goog-FieldMask": "location,formattedAddress" }),
    },
  );
  if (!response.ok) throw new Error(`Place lookup failed — HTTP ${response.status}`);
  const data = (await response.json()) as {
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
  };
  const latitude = data.location?.latitude;
  const longitude = data.location?.longitude;
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new Error("That place has no coordinates.");
  }
  return {
    label: suggestion.secondary
      ? `${suggestion.primary}, ${suggestion.secondary}`
      : (data.formattedAddress ?? suggestion.primary),
    location: { latitude, longitude },
  };
}
