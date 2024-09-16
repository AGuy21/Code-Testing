import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Configs/FirebaseConfig";
import Colors from "../constants/Colors";

export default function Category({category}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  
  useEffect(() => {
    GetCategories();
  }, []);

  // used to get category list from database
  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Category
      </Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item?.name);
              category(item?.name);
            }}
            style={{
              flex: 1,
            }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item?.name &&
                  styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.ImageUrl }}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light_primary,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.primary,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
});
