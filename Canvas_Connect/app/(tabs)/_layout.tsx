import Colors from "@/constants/Colors";
import React, { useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { router, Tabs } from "expo-router";
import { db } from "../../Configs/FirebaseConfig"; 

import { createContext } from 'react';

export default function TabLayout() {
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/sign-in");
      alert("User Data Unavailable, please sign in and try again!");
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.emailAddresses[0].emailAddress);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Got User's Data Successfully!");
          console.log(docSnap.data());
        } else {
          console.log("User's Data not documented... creating new doc....");
          await setDoc(docRef, {
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // ✅ Call the async function
  }, [user]); // ✅ Add user to dependency array


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.background,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarInactiveTintColor: Colors.primaryDark,
        tabBarActiveTintColor: Colors.secondary,
      }}
    >
      <Tabs.Screen
        name="artists"
        options={{
          title: "Artists",
          tabBarIcon: ({ color, size }) => (
            <Fontisto size={size} name="persons" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="art"
        options={{
          title: "Art",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 size={size} name="palette" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              size={size}
              name="message-image"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 size={size} name="person-rays" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
