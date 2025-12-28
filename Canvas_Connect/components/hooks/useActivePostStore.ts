import { create } from "zustand";
import { postType } from "@/constants/types/postType";

type ActivePostStore = {
  activePost: postType | null;
  setActivePost: (post: postType | null) => void;
};

export const useActivePostStore = create<ActivePostStore>((set) => ({
  activePost: null,
  setActivePost: (post) => set({ activePost: post }),
}));
