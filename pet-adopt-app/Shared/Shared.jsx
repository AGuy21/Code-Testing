import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../Configs/FirebaseConfig";

const GetFavList = async (user) => {
  const docSnap = await getDoc(
    doc(db, "UserFavPets", user?.primaryEmailAddress?.emailAddress)
  );
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(
      doc(db, "UserFavPets", user?.primaryEmailAddress?.emailAddress),
      {
        email: user?.primaryEmailAddress?.emailAdress,
        favourites: [],
      }
    );
  }
};

const UpdateFav=async(favourites, user)=> {
    const docRef=doc(db,'UserFavPets', user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            favourites: favourites,
        })
    } catch(e) {

    }
}
export default {
  GetFavList,
  UpdateFav,
};
