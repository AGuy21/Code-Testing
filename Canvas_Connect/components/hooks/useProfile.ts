import { useState } from "react";
import { useUserDataStore } from "@/components/hooks/store";
import { useThemeStore } from "@/components/hooks/useThemeStore";

export const useProfile = () => {
  const userData = useUserDataStore((state) => state.data);
  const { colors } = useThemeStore();
  const [modalOpen, setModalOpen] = useState(false);

  return {
    userData,
    colors,
    modalOpen,
    setModalOpen,
  };
};
