import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../Configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);
  const GetSliders = async () => {
    setSliderList([]); // resets list
    const snapshop = await getDocs(collection(db, "Sliders"));
    snapshop.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.ImageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
