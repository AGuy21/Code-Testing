import React, { useState } from 'react'
import SettingsButton from '../SettingsButton'
import { useClerk } from '@clerk/clerk-expo'
import { useThemeStore } from "@/components/hooks/useThemeStore";
import SelectionModal from "@/components/ui/SelectionModal";

const SignOut = () => {
    const { signOut } = useClerk();
    const { colors } = useThemeStore();
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleSignOut = async () => {
        await signOut();
    };

  return (
    <>
        <SettingsButton onPress={handlePress} icon={"logout"} text='Sign Out' color={colors.error}/>
        <SelectionModal
            visible={modalVisible}
            title="Sign Out"
            message="Are you sure you want to sign out?"
            onClose={() => setModalVisible(false)}
            options={[
                { text: "Sign Out", onPress: handleSignOut, style: "destructive" },
                { text: "Cancel", style: "cancel" },
            ]}
        />
    </>
  )
}

export default SignOut