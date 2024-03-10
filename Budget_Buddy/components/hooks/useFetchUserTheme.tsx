import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import colorLib from "../../constants/colorLib";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { AppContext } from "../../app/_layout";

/**
 * Custom hook to fetch and set the user's theme colors.
 */
const useFetchUserTheme = () => {
    const user = useUser();
    const colorContext = React.useContext(AppContext);
    const setColors = colorContext?.setColors;

    const [complete, setComplete] = useState<boolean>(false);
    const docRef = doc(
        FIREBASE_DB,
        "User Data",
        user.user?.emailAddresses[0]?.emailAddress
    );

    /**
     * Fetches the user's theme data from Firestore and sets the colors accordingly.
     */
    const getAndSetData = async () => {
        const getThemeData = await getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                setColors(colorLib[doc.data()?.Theme]);
                setComplete(true);
            } else {
                setColors(colorLib.Basic);
                setComplete(true);
            }
        });
    };

    useEffect(() => {
        getAndSetData();
    }, []);

    return complete;
};

export default useFetchUserTheme;
