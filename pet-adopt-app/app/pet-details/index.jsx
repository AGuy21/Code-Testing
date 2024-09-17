import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Configs/FirebaseConfig";

export default function PetDetails() {
  const { user } = useUser();

  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  /**
   * Used to initate the chat between two users
   */
  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress.emailAddress + "_" + pet?.email;
    const docId2 = pet?.email + "_" + user?.primaryEmailAddress.emailAddress;

    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });

    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress.emailAddress,
            ImageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            ImageUrl: pet?.userImage,
            name: pet?.userName,
          },
        ],
        userIds:[user?.primaryEmailAddress.emailAddress, pet?.email ]
      });
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    }
  };
  return (
    <View>
      <ScrollView>
        {/* Pet Info */}
        <PetInfo pet={pet} />
        {/* Pet Properties */}
        <PetSubInfo pet={pet} />
        {/* about */}
        <AboutPet pet={pet} />
        {/* owner details */}
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }} />
      </ScrollView>
      {/* Adopt me button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adoptBtn} onPress={InitiateChat}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-med",
              fontSize: 20,
            }}
          >
            Adpot Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.primary,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
