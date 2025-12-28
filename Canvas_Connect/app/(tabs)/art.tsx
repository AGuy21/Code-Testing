import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { usePaginatedPosts, SortOption } from "@/components/hooks/usePaginatedPosts";
import SelectionModal from "@/components/ui/SelectionModal";
import { SafeAreaView } from "react-native-safe-area-context";
import ArtHeader from "../../components/ui/art/ArtHeader";
import ArtList from "../../components/ui/art/ArtList";

export default function Art() {
  const { colors } = useThemeStore();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const { 
    posts, 
    loading, 
    refreshing, 
    page,
    hasMore,
    refresh,
    nextPage,
    prevPage
  } = usePaginatedPosts(sortBy);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ArtHeader sortBy={sortBy} onFilterPress={() => setFilterModalVisible(true)} />
      
      <ArtList 
        posts={posts}
        loading={loading}
        refreshing={refreshing}
        refresh={refresh}
        page={page}
        hasMore={hasMore}
        onNext={nextPage}
        onPrev={prevPage}
      />

      <SelectionModal
        visible={filterModalVisible}
        title="Sort By"
        options={[
          { text: "Newest", onPress: () => { setSortBy('newest'); setFilterModalVisible(false); } },
          { text: "Oldest", onPress: () => { setSortBy('oldest'); setFilterModalVisible(false); } },
          { text: "Most Liked", onPress: () => { setSortBy('most-liked'); setFilterModalVisible(false); } },
          { text: "Cancel", style: "cancel", onPress: () => setFilterModalVisible(false) }
        ]}
        onClose={() => setFilterModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
