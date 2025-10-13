import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { exampleData } from "@/constants/data/PostsExampleData";

const PreviousPosts = () => {

  return (
    <FlatList
      style={styles.previousPostsLists}
      horizontal={true}
      data={exampleData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.previousPost}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <LinearGradient
            colors={["transparent", "transparent", Colors.primaryLight]}
            style={styles.imageGradient}
          />

          <Image source={{ uri: item.picture }} style={styles.postPicture} />

          <View style={styles.postStats}>
            <View
              style={{
                flexDirection: "row",
                gap: wp(1),
              }}
            >
              <FontAwesome name="comments" size={wp(6)} color={Colors.background} />
              <Text style={styles.postStatText}>{item.likes}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: wp(1),
              }}
            >
              <AntDesign name="heart" size={wp(6)} color={Colors.background} />
              <Text style={styles.postStatText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default PreviousPosts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingVertical: hp(2.5),
  },
  text: {
    color: Colors.text,
    fontFamily: "Nunito-Medium",
  },
  titleText: {
    fontFamily: "Nunito-BlackItalic",
    fontSize: hp(3),
    color: Colors.text,
    width: "90%",
    borderBottomColor: Colors.tertiary,
    borderBottomWidth: hp(0.25),
  },
  previousPostsContainer: {
    paddingLeft: wp(2.5),
  },
  previousPostsLists: {
    marginTop: hp(1),
  },
  previousPost: {
    flex: 1,
    width: wp(60),
    height: hp(20),
    borderWidth: wp(1),
    borderColor: Colors.primaryLight,
    borderRadius: wp(3.5),
    marginRight: hp(2),
    backgroundColor: Colors.primaryDark,
  },
  postTitle: {
    fontSize: wp(5),
    paddingLeft: wp(2),
    fontFamily: "Nunito-Bold",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.background,
    flex: 0.15,
    backgroundColor: Colors.primaryLight,
  },
  postPicture: {
    objectFit: "fill",
    flex: 0.85,
    backgroundColor: Colors.error,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  imageGradient: {
    position: "absolute",
    marginTop: wp(7.5),
    width: wp(58),
    height: hp(16),
    zIndex: 10,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  postStats: {
    position: "absolute",
    zIndex: 15,
    width: wp(58),
    height: hp(5),
    marginTop: hp(14),
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(2),
  },
  postStatText: {
    color: Colors.background,
    fontSize: hp(2),
    fontFamily: "Nunito-Bold",
  },
});
