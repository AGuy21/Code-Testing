import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    user && GetUserList();
  }, []);
  //Get User List Depends on Current User Emails
  const GetUserList = async () => {
    setLoading(true)
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapshop = await getDocs(q);

    querySnapshop.forEach((doc) => {
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoading(false);
  };

  // Filter the list of Other User in one state
  const MapOtherUserList = () => {
    const list = [];

    userList.forEach((item) => {
      const otherUser = item.users.filter(
        (user) => user?.email != user?.primaryEmailAddress
      );
      const result = {
        docId: item.id,
        ...otherUser[1],
      };
      list.push(result);
    });


    return list;
  };
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
        Inbox
      </Text>
      <FlatList
        refreshing={loading}
        onRefresh={GetUserList}
        data={MapOtherUserList()}
        style={{
          marginTop: 20,
        }}
        renderItem={({ item, index }) => <UserItem userInfo={item} />}
      />
    </View>
  );
}
