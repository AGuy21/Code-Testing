import MapView, { PROVIDER_GOOGLE, type Region } from "react-native-maps";
import { StyleSheet } from "react-native";
import type { RefObject } from "react";
import type { Hangout, HangoutId } from "../../constants/types/hangout";
import { HangoutMarker } from "./HangoutMarker";

export interface HangoutMapProps {
  hangouts: Hangout[];
  selectedId: HangoutId | null;
  onSelect: (id: HangoutId | null) => void;
  /** Returns the live head count for a hangout (base + user's RSVP). */
  goingCountFor: (id: HangoutId) => number;
  initialRegion: Region;
  showsUserLocation?: boolean;
  mapRef?: RefObject<MapView | null>;
}

export function HangoutMap({
  hangouts,
  selectedId,
  onSelect,
  goingCountFor,
  initialRegion,
  showsUserLocation = false,
  mapRef,
}: HangoutMapProps) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={initialRegion}
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={false}
      onPress={(event) => {
        const action = (event.nativeEvent as { action?: string }).action;
        if (action !== "marker-press") {
          onSelect(null);
        }
      }}
      onMapReady={() => {
        if (hangouts.length === 0) return;
        mapRef?.current?.fitToCoordinates(
          hangouts.map((hangout) => hangout.location),
          {
            edgePadding: { top: 160, right: 60, bottom: 280, left: 60 },
            animated: false,
          },
        );
      }}
    >
      {hangouts.map((hangout) => (
        <HangoutMarker
          key={hangout.id}
          hangout={hangout}
          goingCount={goingCountFor(hangout.id)}
          selected={hangout.id === selectedId}
          onPress={onSelect}
        />
      ))}
    </MapView>
  );
}