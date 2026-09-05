import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AppText,
  AppTextInput,
  Card,
  NavTile,
  PrimaryButton,
  Screen,
} from "../componenets/ui";
import { theme } from "../constants/theme";
import Divider from "../componenets/ui/Divider";

export default function HomeScreen() {
  const router = useRouter();
  const [lotId, setLotId] = useState("");

  const lotReady = lotId.trim().length > 0;

  const goToLot = () => {
    if (!lotReady) return;
    router.push(`/park/${lotId.trim()}`);
  };

  return (
    <Screen scroll padded={false}>
      <View style={styles.hero}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>P</Text>
        </View>
        <AppText variant="hero" style={styles.brandName}>
          Parking Concept
        </AppText>
        <AppText variant="subtitle" style={styles.tagline}>
          Find your lot, pay, and park
        </AppText>
      </View>

      <View style={styles.content}>
        <Card>
          <AppText variant="label" style={{ marginBottom: theme.spacing.sm }}>
            Enter lot ID
          </AppText>
          <AppTextInput
            value={lotId}
            onChangeText={setLotId}
            placeholder="e.g. 14"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            onSubmitEditing={goToLot}
          />
          <PrimaryButton
            label="Find parking lot"
            onPress={goToLot}
            disabled={!lotReady}
          />
        </Card>
        
        <Divider />

        <NavTile
          title="Employee Login"
          subtitle="Staff dashboard and lot management"
          href="/login"
        />

        <Divider />

        <AppText variant="muted" style={styles.hint}>
          Tip: scanning a lot's QR code drops you straight into checkout.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    height: 300,
    justifyContent: "center",
    overflow: "hidden",
  },
  glowSmall: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.pill,
    height: 140,
    width: 140,
    opacity: 0.7,
    position: "absolute",
    right: -50,
    top: 90,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radii.md + 4,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    marginBottom: theme.spacing.md,
    width: 72,
  },
  brandMarkText: {
    color: theme.colors.white,
    fontSize: 34,
    fontWeight: "800",
  },
  brandName: {
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    textAlign: "center",
  },
  content: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionLabel: {
    marginTop: theme.spacing.sm,
  },
  hint: {
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },
});
