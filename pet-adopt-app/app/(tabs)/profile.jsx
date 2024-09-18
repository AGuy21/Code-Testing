import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  // Menu as a map for easier coding
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Favourites",
      icon: "heart",
      path: "/(tabs)/favourite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];

  const onPressMenu=(menu)=> {
    if (menu.path === 'logout') {
      signOut();
      router.replace('../login')
    } else {
      router.push(menu.path)
    }
  }
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 30,
        }}
      >
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginVertical: 25,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginTop: 6,
          }}
        >
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            color: Colors.gray,
          }}
        >
          {user?.primaryEmailAddress.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={()=> onPressMenu(item)}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={item.icon}
              size={30}
              color={Colors.primary}
              style={{
                padding: 10,
                backgroundColor: Colors.light_primary,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
