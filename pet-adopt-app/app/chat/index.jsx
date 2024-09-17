import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../Configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from 'moment'

export default function ChatScreen() {
  const { user } = useUser();

  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(collection(db, 'Chat', params.id, 'Messages'), (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }))

      setMessages(messageData)
    });

    return ()=> unsubscribe();
  }, []);

  /**
   * Get Users Info
   */
  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    const otherUser = result?.users.filter(
      (item) => item.email != user?.primaryEmailAddress.emailAddress
    );

    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };

  const onSend = async (newMessage) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    newMessage[0].createdAt=moment().format('MM-DD-YYY HH:mm:ss')
    await addDoc(collection(db, "Chat", params.id, "Messages"), newMessage[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
