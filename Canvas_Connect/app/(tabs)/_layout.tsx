import Colors from "@/constants/Colors";
import React, { createContext, useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router, Tabs } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../Configs/FirebaseConfig";
import { userDataType } from "@/constants/types/userDataType";
import { useUserDataStore } from "@/components/hooks/store";
import { generateFromEmail, generateUsername } from "unique-username-generator";
import BaseProfilePicture from "@/constants/BaseProfilePicture";

type TabBarIconType = {
  color: string,
  size: number,
}
export default function TabLayout() {
  const { user } = useUser();

  const setLoading = useUserDataStore((state) => state.setLoading);
  const setUserData = useUserDataStore((state) => state.setData);

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/sign-in");
      alert("User Data Unavailable, please sign in and try again!");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.emailAddresses[0].emailAddress);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Got User's Data Successfully!");
          setUserData(docSnap.data() as userDataType);
          console.log(docSnap.data());
        } else {
          console.log("User's Data not documented... creating new doc....");
          await setDoc(docRef, {
            username:
              user.username === null
                ? generateFromEmail(user.emailAddresses[0].emailAddress, 3)
                : user.username,
            email: user.emailAddresses[0].emailAddress,
            profilePicture: BaseProfilePicture,
          });
          setUserData({
            username:
              user.username === null
                ? generateFromEmail(user.emailAddresses[0].emailAddress, 3)
                : user.username,
            email: user.emailAddresses[0].emailAddress,
            profilePicture: BaseProfilePicture,
          });
        }
      } catch (error) {
        router.replace("/(auth)/sign-in");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

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
          tabBarIcon: ({ color, size }: TabBarIconType) => (
            <Fontisto size={size} name="persons" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="art"
        options={{
          title: "Art",
          tabBarIcon: ({ color, size }: TabBarIconType) => (
            <FontAwesome6 size={size} name="palette" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }: TabBarIconType) => (
            <FontAwesome5 size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }: TabBarIconType) => (
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
          tabBarIcon: ({ color, size }: TabBarIconType) => (
            <FontAwesome6 size={size} name="person-rays" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
