import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeStore } from "@/components/hooks/useThemeStore";

const CreatePostButton = () => {
  const router = useRouter();
  const { colors } = useThemeStore();

  return (
    <Pressable 
      style={[styles.newPostButton, { backgroundColor: colors.secondary }]} 
      onPress={() => router.push("/create")} 
    >
      <MaterialIcons name="draw" size={wp(10)} color={colors.text2} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  newPostButton: {
    marginRight: wp(5),
    borderRadius: hp(100),
    alignSelf: "flex-end",
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CreatePostButton;
