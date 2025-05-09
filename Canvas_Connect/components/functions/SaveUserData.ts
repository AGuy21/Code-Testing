import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

type SaveUserDataProps = {
  userEmail: string;
  data: string;
  variable: string;
};

const SaveUserData = async ({
  userEmail,
  data,
  variable,
}: SaveUserDataProps) => {
  const docRef = doc(db, "users", userEmail);

  await updateDoc(docRef, {
    [variable]: data,
  });
};

export default SaveUserData;
