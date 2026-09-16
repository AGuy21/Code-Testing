import React from "react";
import { View } from "react-native";
import { Car } from "../../constants/types/LotDataTypes";
import { AppText } from "./AppText";
import timestampToText from "../functions/timestampToText";
import { theme } from "../../constants/theme";

interface CarListItemProps {
  car: Car;
}

export default function CarListItem({ car }: CarListItemProps) {
  const startTime = car.Start;

  if (!startTime) {
    return null;
  }

  let baseMillis: number | null = null;

  if (typeof (startTime as any)?.toDate === "function") {
    baseMillis = (startTime as any).toDate().getTime();
  } else if (startTime instanceof Date) {
    baseMillis = startTime.getTime();
  } else if (typeof (startTime as any)?.seconds === "number") {
    baseMillis = (startTime as any).seconds * 1000;
  }

  if (baseMillis === null) {
    console.log("Timestamp is missing or still syncing...");
    return null;
  }

  const prepayMins = (car.Prepayment || 0) * 60;
  const allowedUntilDate = new Date(baseMillis + prepayMins * 60 * 1000);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        padding: theme.spacing.lg,
        borderWidth: 1,
      }}
    >
      <AppText variant="caption">Plate: {car.Plate}</AppText>
      <AppText variant="caption">
        Allowed Until: {timestampToText(allowedUntilDate)}
      </AppText>
    </View>
  );
}