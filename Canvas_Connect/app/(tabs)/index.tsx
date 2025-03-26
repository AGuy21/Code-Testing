import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { router } from "expo-router";
import { db } from "../../Configs/FirebaseConfig"; 

console.log("Firestore DB:", db); // Should not be undefined

export default function Home() {
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
    <View style={styles.container}>
      <Text>yo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
