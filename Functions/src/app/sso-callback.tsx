import { Redirect } from "expo-router";

// Landing pad for the OAuth return URL (functions://sso-callback); Clerk
// finishes the session itself, the auth gate then routes the user onward.
export default function SsoCallback() {
  return <Redirect href="/" />;
}
