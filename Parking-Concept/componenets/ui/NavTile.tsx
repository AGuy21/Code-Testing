import { Link, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";

export interface NavTileProps {
  title: string;
  subtitle?: string;
  href: Href;
}

export function NavTile({ title, subtitle, href }: NavTileProps) {
  return (
    <Link href={href} asChild>
      <Pressable
        style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
      >
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>

          <Text style={styles.chevron}>›</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  pressed: {
    opacity: 0.85,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...theme.typography.subtitle,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  chevron: {
    color: theme.colors.accent,
    fontSize: 28,
    fontWeight: "300",
    marginLeft: theme.spacing.sm,
  },
});
