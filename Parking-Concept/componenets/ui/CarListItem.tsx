import { Car } from "../../constants/types/LotDataTypes";
import { View } from "react-native"
import { AppText } from "./AppText";
import timestampToText from "../functions/timestampToText";
import { theme } from "../../constants/theme";

interface CarListItemProps {
    car: Car;
}

export default function CarListItem({car}: CarListItemProps) {

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radii.md,
            padding: theme.spacing.lg,
            borderWidth: 1,
        }}>
            <AppText variant="caption">
                Plate: {car.Plate}
            </AppText>

            <AppText variant="caption">
                Start Time: {timestampToText(car.Start)}
            </AppText>

        </View>
    )
}