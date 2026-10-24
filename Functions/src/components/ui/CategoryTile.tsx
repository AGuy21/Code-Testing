import { StyleSheet, View } from "react-native";
import { CATEGORY_META } from "../../constants/Categories";
import type { HangoutCategory } from "../../constants/types/hangout";
import { Icon } from "./Icon";

export interface CategoryTileProps {
  category: HangoutCategory;
  size?: number;
}

/** Rounded, colour-tinted tile with the category's icon — replaces emoji. */
export function CategoryTile({ category, size = 48 }: CategoryTileProps) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.chill;
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: size * 0.34,
          backgroundColor: `${meta.color}26`,
          borderColor: `${meta.color}66`,
        },
      ]}
    >
      <Icon name={meta.icon} size={size * 0.5} color={meta.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { alignItems: "center", borderWidth: 1.5, justifyContent: "center" },
});
