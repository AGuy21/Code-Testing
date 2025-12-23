import { BackHandler, StyleSheet } from "react-native";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import deleteUsersAccount from "../../../functions/DeleteUsersAccount";
import { useAuth } from "@clerk/clerk-expo";
import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import SelectionModal from "@/components/ui/SelectionModal";

const DeleteUser = () => {
  const { userId } = useAuth();
  const { colors } = useThemeStore();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function confirmDeletion() {
    console.log("Asking for user confirmation before deleting account..");
    setConfirmVisible(true);
  }

  async function AttemptAccountDeletion() {
    console.log("Deleteing account...");
    const attempt = await deleteUsersAccount(userId);
    console.log(attempt);
    if (attempt.isCompleted) {
      console.log("Successfully Deleted User Account");
      setSuccessVisible(true);
    } else {
      let msg = "";
      if (typeof attempt.error == "object" && attempt.error.errors && attempt.error.errors[0]) {
        msg = JSON.stringify(attempt.error.errors[0].message);
      } else {
        msg = JSON.stringify(attempt.error);
      }
      setErrorMessage("Error Occured: " + msg);
      setErrorVisible(true);
      console.log("Error Occured: " + msg);
    }
  }

  return (
    <>
      <SettingsButton
        onPress={confirmDeletion}
        icon={"delete-forever"}
        text="Delete Account"
        color={colors.error}
      />
      
      <SelectionModal
        visible={confirmVisible}
        title="Deletion Confirmation"
        message="Are you sure you want to delete your account PERMANENTLY?"
        onClose={() => setConfirmVisible(false)}
        options={[
          { text: "Delete", onPress: AttemptAccountDeletion, style: "destructive" },
          { text: "Cancel", style: "cancel" },
        ]}
      />

      <SelectionModal
        visible={successVisible}
        title="Account Successfully Deleted"
        message="You will now be closed out of the app"
        onClose={() => BackHandler.exitApp()}
        options={[
          { text: "Ok", onPress: () => BackHandler.exitApp() },
        ]}
      />

      <SelectionModal
        visible={errorVisible}
        title="Error"
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
        options={[
          { text: "Ok", style: "cancel" },
        ]}
      />
    </>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({});
