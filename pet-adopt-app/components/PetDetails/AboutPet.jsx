import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 20,
        }}
      >
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 200}
        style={{
          fontFamily: "outfit",
          fontSize: 14,
          color: Colors.gray,
        }}
      >
        {pet?.about}
      </Text>
      <Pressable onPress={() => setReadMore(!readMore)}>
        {readMore ? (
          <Text
            style={{
              fontFamily: "outfit-med",
              fontSize: 14,
              color: Colors.secondary,
            }}
          >
            Read More
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "outfit-med",
              fontSize: 14,
              color: Colors.secondary,
            }}
          >
            Show Less
          </Text>
        )}
      </Pressable>
    </View>
  );
}
