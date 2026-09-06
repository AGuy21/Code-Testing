import { ActivityIndicator } from "react-native"
import { Screen } from "./Screen"
import { theme } from "../../constants/theme"

export default function LoadingScreen() {
    return (
        <Screen style={{alignItems: 'center', justifyContent: 'center', paddingBottom: "40%"}}>
            <ActivityIndicator size="large" color={theme.colors.accent}/>
        </Screen>
    )
}