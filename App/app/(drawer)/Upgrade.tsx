import { StyleSheet,  } from 'react-native'
import React, { useEffect } from 'react'
import { CountContext, UserContext } from '../_layout';
import { updateDoc, count, doc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Forge from '../../components/THISONE/Forge';
import ShadowArmory from '../../components/THISONE/ShadowArmory';

const Upgrade = () => {

    const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
    const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email) // document refrence for user data fetching and saving

    // Grabs contexts to be used for states
    const countContext = React.useContext(CountContext)
    const userContext = React.useContext(UserContext)

    const char = userContext?.character

    const multiplier = countContext?.multiplier
    const multiInc = countContext?.multiIncrement
    
    const autoClickValue = countContext?.autoClickerValue
    const autoUpgrade = countContext?.autoClickerIncrement


    const saveData = async () => { // saves all nneded data
        const upgradeSet = await updateDoc( docRef , { 
            autoClickerValue: autoClickValue,
            multiplier: multiplier,
        })
      }

    useEffect(() => { // every upgrade it will save all data to make sure no data loss happens on purchuses
        saveData();
        console.log('Saved Upgrade Data!')
      }, [autoClickValue, multiplier]) 
      
    return (
      <>
        { char === 1 ? (
          <Forge />
        ) : (
          <ShadowArmory />
        )}
      </>
    )
}

export default Upgrade
