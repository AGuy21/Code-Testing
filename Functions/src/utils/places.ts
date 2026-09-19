/**
 * Google Places Text Search (New) — used by the host flow to resolve a typed
 * address or place name into coordinates. Uses the same key as the Maps SDK
 * (enable "Places API (New)" in Google Cloud Console alongside the Maps SDK).
 *
 * Expo inlines EXPO_PUBLIC_* vars from .env at bundle time via process.env.
 */
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

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

/** Resolve a typed address / place name into up to `max` coordinate results. */
export async function searchPlaces(query: string, max = 5): Promise<PlaceResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          // Field mask limits the response (and billing) to what we render.
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location",
        },
        body: JSON.stringify({ textQuery: trimmed, pageSize: max }),
      },
    );
    if (!response.ok) {
      throw new Error(`Places API responded ${response.status}`);
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
  } catch (error) {
    console.warn("Places search failed:", error);
    return [];
  }
}