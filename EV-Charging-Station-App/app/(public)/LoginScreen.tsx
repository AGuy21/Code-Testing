import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../components/hooks/warmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    useWarmUpBrowser();
    
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google", });
 
    const signInGoogle = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
    
      const signInApple = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')}
                style={styles.logoImage}
            />
            <Image source={require('../../assets/images/ev-charging.png')}
                style={styles.bgImage}
            />
            <View style={{ padding: 20,}}>
                <Text style={styles.heading}> 
                    Your ultimate EV chargin Station Finder App!
                </Text>
                <Text style={styles.description}> 
                    Find EV charging stations near you, plan trip and so much more in just one click!
                </Text>

                <TouchableOpacity style={styles.button} onPress={signInGoogle}>
                    <Text style={{ 
                        color: Colors.white,
                        textAlign: 'center', 
                        fontSize: 17, 
                        fontFamily: 'outfit'
                    }}>
                        Login With Google
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    logoImage: {
        width: 200,
        height: 100,
        objectFit: 'contain',
    },
    bgImage: {
        width: '100%',
        height: 220,
        marginTop: 20,
        objectFit: 'cover',
    },
    heading: {
        fontSize: 25,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 17,
        fontFamily: 'outfit',
        marginTop: 15,
        textAlign: 'center',
        color: Colors.gray,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        display: 'flex',
        borderRadius: 99,
        marginTop: 70,
    }
});