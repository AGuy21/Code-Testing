import Constants from "expo-constants";
export type DeleteUsersAccountReturnType = { isCompleted: boolean; error: any };

async function deleteUsersAccount(
  userId: string | null | undefined
): Promise<DeleteUsersAccountReturnType> {
  // test cases for userId and key values
  async function testCases(): Promise<DeleteUsersAccountReturnType | void> {
    if (!userId) {
      console.warn("User ID is not available.");
      return { isCompleted: false, error: "User ID not available" };
    }
    if (!Constants.expoConfig?.extra?.clerkSecretKey) {
      console.log(Constants.expoConfig?.extra?.clerkSecretKey);
      console.error("Clerk secret key is not provided.");
      return { isCompleted: false, error: "Clerk secret key is not provided" };
    }
    return; // Indicate success for tests
  }

  async function attemptDeletion(): Promise<DeleteUsersAccountReturnType> {
    // body to try and delete account
    try {
      console.log(`Deleting user account with ID: ${userId}`);
      // delete request
      const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " + Constants.expoConfig?.extra?.clerkSecretKey,
        },
      });
      // returns certain values based on if response works or not
      if (response.ok) {
        console.log("User account deleted successfully");
        return { isCompleted: true, error: undefined };
      } else {
        const error = await response.json();
        console.error("Error deleting account:", error);
        return { isCompleted: false, error: error };
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      return { isCompleted: false, error: error };
    }
  }
  // checking test cases
  const testResult = await testCases();
  if (testResult) {
    return testResult;
  }
  // on success it attempts deletion then returns result
  return await attemptDeletion();
}

export default deleteUsersAccount;
