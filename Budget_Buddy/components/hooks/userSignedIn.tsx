
import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

/*
    This is a custom hooked used to
    check if the user is signed in using
    clerks useAuth hook if they are signed in
    they will be re-directed to the main tab nav
*/

export const useSignedInCheck = () => {
    const { isSignedIn } = useAuth();
 return (
    useEffect(() => {
        if (isSignedIn) {
            router.replace('(auth)')
        } else {
            console.log('User not signed in!')
        }
    })
    )
}