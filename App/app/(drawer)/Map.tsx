import React, { useEffect } from 'react'
import { CountContext, TransmutatorContext, UserContext } from '../_layout';
import { doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import KnightMap from '../../components/THISONE/KnightMap';
import AssassinMap from '../../components/THISONE/AssassinMap';

const Map = () => {

    const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
    const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email) // document refrence for user data fetching and saving

    // Grabs contexts to be used for states
    const transContext = React.useContext(TransmutatorContext)
    const userContext = React.useContext(UserContext)

    const pwr = transContext?.power
    const char = userContext?.character
    const captures = userContext?.captures

    const saveData = async () => { // saves all nneded data
        const upgradeSet = await updateDoc( docRef , { 
            Captures: captures,
            Power: pwr,
        })
      }

    useEffect(() => { // every upgrade it will save all data to make sure no data loss happens on purchuses
        saveData();
        console.log('Saved Capture Data!')
      }, [captures]) 
      
    return (
      <>
        { char === 1 ? (
          <KnightMap />
        ) : (
          <AssassinMap />
        )}
      </>
    )
}

export default Map;