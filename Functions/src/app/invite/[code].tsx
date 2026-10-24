import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AppText, PrimaryButton, Screen } from "../../components/ui";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";

/** Landing screen for `functions://invite/<code>` links. */
export default function InviteLink() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  const palette = useThemePalette();
  const { redeemInviteCode } = useHangouts();
  const [state, setState] = useState<
    { status: "working" } | { status: "ok"; title: string } | { status: "error"; message: string }
  >({ status: "working" });
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || !code) return;
    startedRef.current = true;
    redeemInviteCode(code)
      .then((title) => setState({ status: "ok", title }))
      .catch((error) =>
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Please try again.",
        }),
      );
  }, [code, redeemInviteCode]);

  return (
    <Screen>
      <View style={{ alignItems: "center", gap: 14, marginTop: 80 }}>
        {state.status === "working" ? (
          <>
            <ActivityIndicator size="large" color={palette.primary} />
            <AppText variant="subtitle">Checking your invite…</AppText>
          </>
        ) : state.status === "ok" ? (
          <>
            <AppText variant="hero">You're in 🎉</AppText>
            <AppText variant="caption">You can now see “{state.title}”.</AppText>
          </>
        ) : (
          <>
            <AppText variant="subtitle">Couldn't use that invite</AppText>
            <AppText variant="caption">{state.message}</AppText>
          </>
        )}
        <PrimaryButton
          label="Go to events"
          onPress={() => router.replace("/(tabs)")}
        />
      </View>
    </Screen>
  );
}
