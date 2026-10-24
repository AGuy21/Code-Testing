import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppTextInput } from "../ui";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import {
  autocompletePlaces,
  getPlaceDetails,
  newPlacesSessionToken,
  type PlaceResult,
  type PlaceSuggestion,
} from "../../utils/places";

const SEARCH_DEBOUNCE_MS = 200;

export interface PlaceSearchInputProps {
  /** Called with the chosen place when a suggestion is tapped. */
  onPlaceSelected: (place: PlaceResult) => void;
  /** Optional: pre-selected place name to show under the field. */
  selectedLabel?: string | null;
  /** Biases suggestions toward this point (e.g. the user's location). */
  near?: { latitude: number; longitude: number } | null;
}

/**
 * Typed-address field for the host flow. Debounces the user's text through
 * Google Places Text Search (New) and shows a dropdown of matching places;
 * tapping one hands its coordinates to the caller.
 */
export function PlaceSearchInput({
  onPlaceSelected,
  selectedLabel,
  near,
}: PlaceSearchInputProps) {
  const palette = useThemePalette();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const sessionRef = useRef(newPlacesSessionToken());
  const [isSearching, setIsSearching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Increasing token: only the latest response may render its results.
  const requestRef = useRef(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      setHasError(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const request = ++requestRef.current;
    debounceRef.current = setTimeout(() => {
      autocompletePlaces(query, sessionRef.current, near ?? undefined)
        .then((places) => {
          if (request !== requestRef.current) return; // stale response
          setResults(places);
          setHasError(false);
          setIsSearching(false);
        })
        .catch((error) => {
          console.warn("Places search failed:", error);
          if (request !== requestRef.current) return;
          setResults([]);
          setHasError(true);
          setIsSearching(false);
        });
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, near]);

  const choose = async (suggestion: PlaceSuggestion) => {
    const token = sessionRef.current;
    setIsSearching(true);
    try {
      const place = await getPlaceDetails(suggestion, token);
      setQuery("");
      setResults([]);
      setHasError(false);
      onPlaceSelected(place);
      sessionRef.current = newPlacesSessionToken();
    } catch (error) {
      console.warn("Place lookup failed:", error);
      setHasError(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        label="Address or place"
        value={query}
        onChangeText={setQuery}
        placeholder="Start typing a venue or address"
        returnKeyType="search"
      />

      {isSearching || hasError || results.length > 0 ? (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: palette.surfaceElevated,
              borderColor: palette.border,
            },
          ]}
        >
          {isSearching ? (
            <View style={styles.statusRow}>
              <ActivityIndicator size="small" color={palette.primary} />
              <Text style={[styles.statusText, { color: palette.textMuted }]}>
                Searching places…
              </Text>
            </View>
          ) : hasError ? (
            <View style={styles.statusRow}>
              <Text style={styles.statusIcon}>⚠️</Text>
              <Text
                style={[styles.statusText, { color: palette.textMuted }]}
                numberOfLines={2}
              >
                Places search failed — enable "Places API (New)" for your key
                in Google Cloud Console.
              </Text>
            </View>
          ) : results.length === 0 ? (
            <View style={styles.statusRow}>
              <Text style={[styles.statusText, { color: palette.textMuted }]}>
                No matches found — try a fuller address.
              </Text>
            </View>
          ) : (
            results.map((place, index) => (
              <Pressable
                key={place.placeId}
                onPress={() => void choose(place)}
                style={({ pressed }) => [
                  styles.suggestion,
                  pressed && styles.suggestionPressed,
                  index > 0 && {
                    borderTopWidth: 1,
                    borderTopColor: palette.border,
                  },
                ]}
              >
                <Text style={styles.suggestionIcon}>📍</Text>
                <Text
                  style={[styles.suggestionText, { color: palette.text }]}
                  numberOfLines={1}
                >
                  {place.primary}
                  {place.secondary ? (
                    <Text style={{ color: palette.textMuted }}> · {place.secondary}</Text>
                  ) : null}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      ) : null}

      {selectedLabel ? (
        <Text style={[styles.selected, { color: palette.textMuted }]} numberOfLines={1}>
          📍 {selectedLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  dropdown: {
    borderRadius: 14,
    borderWidth: 1,
    marginTop: -8,
    overflow: "hidden",
  },
  statusRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusText: {
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: 13,
  },
  statusIcon: {
    fontSize: 14,
  },
  suggestion: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  suggestionPressed: {
    opacity: 0.7,
  },
  suggestionIcon: {
    fontSize: 14,
  },
  suggestionText: {
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: 13.5,
  },
  selected: {
    fontFamily: Fonts.Medium,
    fontSize: 12.5,
    marginTop: 6,
  },
});