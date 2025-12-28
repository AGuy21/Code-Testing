import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SortOption } from "@/components/hooks/usePaginatedPosts";

type ArtHeaderProps = {
  sortBy: SortOption;
  onFilterPress: () => void;
};

export default function ArtHeader({ sortBy, onFilterPress }: ArtHeaderProps) {
  const { colors } = useThemeStore();

  return (
    <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.primaryDark }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Explore Art</Text>
      <TouchableOpacity 
        style={[styles.filterButton, { backgroundColor: colors.secondary }]} 
        onPress={onFilterPress}
      >
        <Ionicons name="filter" size={20} color={colors.text2} />
        <Text style={[styles.filterText, { color: colors.text2 }]}>
          {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : 'Most Liked'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 20,
    gap: wp(2),
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: hp(1.8),
  },
});
