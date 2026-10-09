import React, { useEffect } from "react";
import { Alert, Pressable, View } from "react-native";
import { Car } from "../../constants/types/LotDataTypes";
import { AppText } from "./AppText";
import timestampToText from "../functions/timestampToText";
import { theme } from "../../constants/theme";
import removeCar from "../functions/removeCar";

interface CarListItemProps {
  car: Car;
  lot: string;
  onRefreshParent: () => Promise<void>;
}

export default function CarListItem({
  car,
  lot,
  onRefreshParent,
}: CarListItemProps) {
  const startTime = car.Start;
  let baseMillis: number | null = null;
  const GRACE_PERIOD_MINUTES = 180;
  const localTimeMs = Date.now();

  if (typeof (startTime as any)?.toDate === "function") {
    baseMillis = (startTime as any).toDate().getTime();
  } else if (startTime instanceof Date) {
    baseMillis = startTime.getTime();
  } else if (typeof (startTime as any)?.seconds === "number") {
    baseMillis = (startTime as any).seconds * 1000;
  }

  const hasValidStartTime = baseMillis !== null;
  const resolvedBaseMillis = baseMillis ?? 0;
  const prepayMins = (car.Prepayment || 0) * 60;
  const allowedUntilMs = resolvedBaseMillis + (prepayMins + GRACE_PERIOD_MINUTES) * 60 * 1000;
  const allowedUntilDate = new Date(resolvedBaseMillis + prepayMins * 60 * 1000);

  const context = globalThis as any;
  const firebaseClockOffset = context._firestoreServerTimeOffset || 0;
  const secureCurrentTimeMs = localTimeMs + firebaseClockOffset;

  const isOvertime = hasValidStartTime && allowedUntilMs < secureCurrentTimeMs;

  useEffect(() => {
    if (!isOvertime) return;

    let cancelled = false;
    const removeOvertimeCar = async () => {
      const deleted = await removeCar(lot, car.Plate, car.Prepayment);
      if (deleted && !cancelled) {
        await onRefreshParent();
      }
    };

    void removeOvertimeCar();
    return () => {
      cancelled = true;
    };
  }, [car.Plate, car.Prepayment, isOvertime, lot, onRefreshParent]);

  if (!hasValidStartTime) {
    return null;
  }
  
  function handleDeleteCar() {
    console.log(lot, car.Plate, car.Prepayment);
    Alert.alert(
      "Confirm Deletion?",
      "Press OK to confirm deletion of car on dashboard and database",
      [
        {
          text: "cancel",
          onPress: () => console.log("Cancelled Deletion:", car.Plate),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const deleted = await removeCar(lot, car.Plate, car.Prepayment);
            if (deleted) {
              await onRefreshParent();
            }
          },
        },
      ],
    );
  }

  
  return (
    <Pressable onPress={() => handleDeleteCar()}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isOvertime
            ? theme.colors.error
            : "#008000",
          borderColor: theme.colors.border,
          borderRadius: theme.radii.md,
          padding: theme.spacing.lg,
          borderWidth: 1,
        }}
      >
        <View>
          <AppText variant="caption" style={{ fontWeight: "bold", color: "#000" }}>
            Plate: {car.Plate}
          </AppText>
          <AppText variant="caption" style={{ fontWeight: "bold", color: "#000" }}>
            Make: {car.Make}
          </AppText>
          <AppText variant="caption" style={{ fontWeight: "bold", color: "#000" }}>
            Color: {car.Color}
          </AppText>
        </View>

        <AppText variant="caption" style={{ fontWeight: "bold", color: "#000"}}>
          Allowed Until: {timestampToText(allowedUntilDate)}
        </AppText>
      </View>
    </Pressable>
  );
}
