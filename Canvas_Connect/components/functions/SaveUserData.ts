import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";
import { userDatVariables } from "@/constants/types/userDataVariables";

type SaveUserDataProps = {
  userEmail: string;
  newData: string;
  variable: userDatVariables;
};

const SaveUserData = async ({
  userEmail,
  newData,
  variable,
}: SaveUserDataProps) => {
  console.log("saving user data");
  const docRef = doc(db, "users", userEmail);

  await updateDoc(docRef, {
    [variable]: newData,
  });
};

export default SaveUserData;
