import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import {
  AppText,
  AppTextInput,
  Card,
  PrimaryButton,
  Screen,
} from "../../components/ui";
import { HangoutCard } from "../../components/hangouts/HangoutCard";
import { useHangouts } from "../../hooks/useHangouts";

function ListSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen() {
  const { hangouts, isLoading, syncError, redeemInviteCode, canRsvp } =
    useHangouts();
  const [code, setCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const redeem = async () => {
    setRedeeming(true);
    try {
      const title = await redeemInviteCode(code);
      setCode("");
      Alert.alert("You're in", `You can now see "${title}".`);
    } catch (error) {
      Alert.alert(
        "Couldn't use that code",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <Screen scroll>
      <AppText variant="hero">Events</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        {isLoading
          ? "Syncing hangouts…"
          : `${hangouts.length} hangouts happening around you — say if you're in`}
      </AppText>

      {syncError ? (
        <Card variant="accent" style={styles.syncBanner}>
          <AppText variant="caption">⚠️ {syncError}</AppText>
        </Card>
      ) : null}

      <AppTextInput
        value={code}
        onChangeText={setCode}
        placeholder="Have an invite code?"
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="go"
        onSubmitEditing={() => void redeem()}
      />
      {code.trim().length > 0 ? (
        <PrimaryButton
          label={redeeming ? "Checking…" : "Use invite code"}
          onPress={() => void redeem()}
          disabled={redeeming || !canRsvp}
          style={styles.redeem}
        />
      ) : null}

      <FlatList
        data={hangouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HangoutCard hangout={item} />}
        ItemSeparatorComponent={ListSeparator}
        scrollEnabled={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  syncBanner: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 20,
    marginTop: 6,
  },
  redeem: {
    marginBottom: 16,
  },
  separator: {
    height: 14,
  },
});
