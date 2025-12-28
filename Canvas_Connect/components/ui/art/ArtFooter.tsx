import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import Ionicons from "@expo/vector-icons/Ionicons";

type ArtFooterProps = {
  page: number;
  hasMore: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export default function ArtFooter({ page, hasMore, onNext, onPrev }: ArtFooterProps) {
  const { colors } = useThemeStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onPrev} 
        disabled={page === 1}
        style={[styles.button, { backgroundColor: colors.primary, opacity: page === 1 ? 0.5 : 1 }]}
      >
        <Ionicons name="arrow-back" size={20} color={colors.background} />
        <Text style={[styles.text, { color: colors.background }]}>Prev</Text>
      </TouchableOpacity>

      <Text style={[styles.pageText, { color: colors.text }]}>Page {page}</Text>

      <TouchableOpacity 
        onPress={onNext} 
        disabled={!hasMore}
        style={[styles.button, { backgroundColor: colors.primary, opacity: !hasMore ? 0.5 : 1 }]}
      >
        <Text style={[styles.text, { color: colors.background }]}>Next</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    width: wp(100),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 20,
    gap: wp(2),
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: hp(1.8),
  },
  pageText: {
    fontFamily: "Nunito-Bold",
    fontSize: hp(2),
  },
});
