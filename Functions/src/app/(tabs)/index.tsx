import { FlatList, StyleSheet, View } from "react-native";
import { AppText, Screen } from "../../components/ui";
import { HangoutCard } from "../../components/hangouts/HangoutCard";
import { useHangouts } from "../../hooks/useHangouts";

function ListSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen() {
  const { hangouts, isLoading } = useHangouts();

  return (
    <Screen scroll>
      <AppText variant="hero">Events</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        {isLoading
          ? "Syncing hangouts…"
          : `${hangouts.length} hangouts happening around you — say if you're in`}
      </AppText>

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
  subtitle: {
    marginBottom: 20,
    marginTop: 6,
  },
  separator: {
    height: 14,
  },
});
