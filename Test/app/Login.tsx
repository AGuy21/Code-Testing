import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const auth = FIREBASE_AUTH

    const signIn =async () => {
        setIsLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Login Successful');
        } catch (error: any) {
            console.log(error);
            alert('Sign In Failed' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const signUp =async () => {
        setIsLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check Your Emails!');
        } catch (error: any) {
            console.log(error);
            alert('Sign Up Failed' + error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' 
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput style={styles.input} placeholder="password" autoCapitalize='none' 
                    secureTextEntry={true}  
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            
                { isLoading ? ( <ActivityIndicator size='large' color='#0000ff' /> 
                ) : (
                <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="Create Account" onPress={signUp} />
                </>
                )}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: wp('80%'),
        height: hp('5%'),
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
    }
})