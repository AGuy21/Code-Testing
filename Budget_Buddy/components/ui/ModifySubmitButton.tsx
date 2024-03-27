import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { AppContext } from "../../app/_layout";
import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

// props of params passed into the button
interface ModifySubmitButtonProps {
  editedName: string;
  editedAmount: number;
  editedType: string;
  fixedType: string;
  editedFrequency: string;
  id: string;
}
/**
 * This component renders a button that submits the data entered by the user to the Firebase database.
 * The data is submitted to the user's account in the database.
 * @param {string} editedName - The name of the expense.
 * @param {number} editedAmount - The amount of the expense.
 * @param {string} editedType - The type of the expense.
 * @param {string} fixedType - The type of the expense.
 * @param {string} editedFrequency - The frequency of the expense.
 * @param {string} id - The id of the expense.
 * @returns {JSX.Element} The JSX element representing the ModifySubmitButton component.
 */
const ModifySubmitButton = ({
  editedName,
  editedAmount,
  editedType,
  fixedType,
  editedFrequency,
  id,
}: ModifySubmitButtonProps) => {
  const user = useUser();
  /**
   * This function will run when the modified expense has the same type
   * This is because we update the doc and not delete/add
   * this updates the doc specified into the new data
   * @returns {Promise<void>} - A promise that resolves when the doc is updated which.
   */
  const handleSameTypeSubmit = async (): Promise<void> => {
    const docRef = doc(
      FIREBASE_DB,
      "User Data",
      user.user?.emailAddresses[0].emailAddress,
      editedType,
      id
    );
    await updateDoc(docRef, {
      Name: editedName,
      Amount: editedAmount,
      Frequency: editedFrequency,
    });
  };
  /**
   * This function will run when the modified expense has a different type
   * This is because we delete the doc and add a new doc
   * this deletes the doc specified and adds a new doc into the mew specified collection
   * @returns {Promise<void>} - A promise that resolves when the doc is updated which.
  */
  const handleDiffrentTypeSubmit = async (): Promise<void> => {
    console.log(fixedType, editedType);
    const docRef = doc(
      FIREBASE_DB,
      "User Data",
      user.user?.emailAddresses[0].emailAddress,
      fixedType,
      id
    );
    const collectionRef = collection(
      FIREBASE_DB,
      "User Data",
      user.user?.emailAddresses[0].emailAddress,
      editedType
    );
    await addDoc(collectionRef, {
      Name: editedName,
      Amount: editedAmount,
      Frequency: editedFrequency,
    });

    await deleteDoc(docRef);
  };

  const appContext = React.useContext(AppContext);
  const setRefresh = appContext?.setRefresh;
  /**
   * This function will run when the user presses the submit button
   * This will see if the types are the same and then run the respective functions.
   * Then after it is complete it will refresh the users phone.
  */
  const HandleSubmit = async () => {
    if (fixedType === editedType) {
      handleSameTypeSubmit().then(() => {
        setRefresh(true);
      });
    } else {
      handleDiffrentTypeSubmit().then(() => {
        setRefresh(true);
      });
    }
  };
  return (
    <View>
      <Button title="Submit" onPress={() => HandleSubmit()} />
    </View>
  );
};

export default ModifySubmitButton;
