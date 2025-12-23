import { create } from "zustand";
import { Themes, ThemeKeys } from "@/constants/Themes";
import { useUserDataStore } from "./store";
import SaveUserData from "../functions/SaveUserData";

type ThemeStore = {
  themeName: ThemeKeys;
  colors: typeof Themes.Default;
  setTheme: (themeName: ThemeKeys, userEmail?: string) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themeName: "Default",  
  colors: Themes.Default,
  setTheme: (themeName, userEmail) => {
    set({ themeName, colors: Themes[themeName] });
    
    // Also update the user data store and firestore if email is provided
    if (userEmail) {
        const userDataStore = useUserDataStore.getState();
        userDataStore.setData({ ...userDataStore.data, theme: themeName });
        SaveUserData({
            userEmail: userEmail,
            newData: themeName,
            variable: "theme"
        });
    }
  },
}));
