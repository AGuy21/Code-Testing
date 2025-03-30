import { userDataType } from '@/constants/types/userDataType';
import { create } from 'zustand';

type userDataStore = {
    data: userDataType | null;
    isLoading: boolean;
    setData: (newData: userDataType) => void;
    setLoading: (loading: boolean) => void;
};

export const useUserDataStore = create<userDataStore>((set) => ({
    data: null,
    isLoading: true,
    setData: (newData) => set({ data: newData }),
    setLoading: (loading) => set({ isLoading: loading }),
}));