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
import { searchPlaces, type PlaceResult } from "../../utils/places";

const SEARCH_DEBOUNCE_MS = 350;

export interface PlaceSearchInputProps {
  /** Called with the chosen place when a suggestion is tapped. */
  onPlaceSelected: (place: PlaceResult) => void;
  /** Optional: pre-selected place name to show under the field. */
  selectedLabel?: string | null;
}

/**
 * Typed-address field for the host flow. Debounces the user's text through
 * Google Places Text Search (New) and shows a dropdown of matching places;
 * tapping one hands its coordinates to the caller.
 */
export function PlaceSearchInput({
  onPlaceSelected,
  selectedLabel,
}: PlaceSearchInputProps) {
  const palette = useThemePalette();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Increasing token: only the latest response may render its results.
  const requestRef = useRef(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 3) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const request = ++requestRef.current;
    debounceRef.current = setTimeout(() => {
      void searchPlaces(query).then((places) => {
        if (request !== requestRef.current) return; // stale response
        setResults(places);
        setIsSearching(false);
      });
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const choose = (place: PlaceResult) => {
    setQuery("");
    setResults([]);
    setIsSearching(false);
    onPlaceSelected(place);
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        label="Address or place"
        value={query}
        onChangeText={setQuery}
        placeholder="Type an address or venue — tap a match to pin it"
        returnKeyType="search"
      />

      {isSearching || results.length > 0 ? (
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
          ) : (
            results.map((place, index) => (
              <Pressable
                key={`${place.label}-${index}`}
                onPress={() => choose(place)}
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
                  {place.label}
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
    fontFamily: Fonts.Medium,
    fontSize: 13,
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