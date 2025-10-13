import BaseProfilePicture from "@/constants/BaseProfilePicture";
import { userDataType } from "@/constants/types/userDataType";
import { create } from "zustand";

type userDataStore = {
  data: userDataType;
  isLoading: boolean;
  setData: (newData: userDataType) => void;
  setLoading: (loading: boolean) => void;
};

export const useUserDataStore = create<userDataStore>((set) => ({
  data: {
    email: "Loading...",
    profilePicture: BaseProfilePicture,
    username: "Loading...",
    posts: [],
  },
  isLoading: true,
  setData: (newData) => set({ data: newData }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
