import React, { useRef, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import PostCard from "@/components/ui/PostCard";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { postType } from "@/constants/types/postType";
import ArtFooter from "./ArtFooter";

type ArtListProps = {
  posts: postType[];
  loading: boolean;
  refreshing: boolean;
  refresh: () => void;
  page: number;
  hasMore: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export default function ArtList({ 
  posts, 
  loading, 
  refreshing, 
  refresh,
  page,
  hasMore,
  onNext,
  onPrev
}: ArtListProps) {
  const { colors } = useThemeStore();
  const listRef = useRef<FlatList>(null);

  // Scroll to top when page changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [page]);

  const renderItem = useCallback(({ item }: { item: postType }) => (
    <View style={styles.postContainer}>
        <PostCard post={item} variant="large" />
    </View>
  ), []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: hp(42), // hp(40) height + hp(2) marginBottom
    offset: hp(42) * index,
    index,
  }), []);

  if (loading && posts.length === 0) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      style={styles.list}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      getItemLayout={getItemLayout}
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      windowSize={5}
      removeClippedSubviews={true}
      ListFooterComponent={
        <ArtFooter 
          page={page} 
          hasMore={hasMore} 
          onNext={onNext} 
          onPrev={onPrev} 
        />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: hp(2),
    paddingBottom: hp(10),
    alignItems: 'center',
  },
  postContainer: {
    marginBottom: hp(2),
    paddingHorizontal: wp(2),
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
