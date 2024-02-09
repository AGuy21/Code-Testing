import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig'
import { collection, count, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"; 
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import LeaderboardLoading from './LeaderBoardLoading';
import { CountContext, TransmutatorContext, UserContext } from '../../app/_layout';
import { StatusBar } from 'expo-status-bar';



const PWRLeaderBoardData = () => {
    // contexts and states for USER DATA
    const userContext = React.useContext(UserContext)
    const transContext = React.useContext(TransmutatorContext)

    const username = userContext?.username
    const userPower = transContext?.power
    
    // states listed below for this page 
    const [ refresh, setRefresh] = useState(true)
    const [loading, setLoading] = useState(false); // to show loading indicator whenever needed
    // all data states
    const [lbData, setLbData] = useState<{ name: string; power: number; character: number }[]>(); // to use data as global
    const [dataRetrieved, setDataRetrieved] = useState(true); // So the program knows when the data is retrieved by using a state to update it !!!ALWAYS WILL BE TRUE!!!

    const [ knightData, setKnightData ] = useState(0); // data for comparing strongest combined power / riches
    const [ assassinData, setAssassinData ] = useState(0);

    const [ strongestFac, setStrongestFac ] = useState(0); // to use the strongest fac in the leaderboard

    let userData: { [key: string]:  [ number, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard

    // firebase variables and functions
    const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
    const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email) // document refrence for user data fetching and saving

    const getData = async () => { // gets the users data
        console.log("Starting Collection "); // for debugging
        const getCollection = await getDocs(collection(FIREBASE_DB, "count"));
        getCollection.forEach((doc: any) => {
            userData[doc.data().Username] = [doc.data().Power, doc.data().Character] ; // adds the data from the doc into the object to be user
            console.log(userData); // for debugging
        });
    };

    const savePower = async () => { // saves all data when called 
        const countSet = await updateDoc( docRef , { Power: userPower})
    }
    
    useEffect(() => { // to run all data again if the user refreshes
        if (refresh) {
            setLoading(true);

            savePower();
            let timer = setTimeout(() => {
                getData();
            },10)
            
            setRefresh(false)
        }
    }, [refresh]);

    useEffect(() => { // to set the data into an array when data is retrieved and/or a refresh is activated
        if (dataRetrieved === true && refresh === true) {
        // IF the data is retrieved it will then map that data for use
            console.log("Converting Data..."); // so dev knows if data is being converted
            // timeout is needed!!
            let Timeout = setTimeout(() => { // sets a timeout so the data can have time to be set
                const dataArray = Object.entries(userData).map(([name, data]) => ({
                    name,
                    power: data[0], // data one is count so we go to array index 1 to get count data
                    character: data[1],
                })); 

            // AFTER data is converted
                console.log('Before Sorted ' + dataArray) // for debugging
                const sortedData = dataArray.sort((a, b) => {
                  const aPower = a.power ?? 0 // if undefined will set its default value to 0
                  const bPower = b.power ?? 0
                  
                  return bPower - aPower 
                }); // to set the data to be used in the leaderboard as the sorted data
                setLbData(sortedData)
                setLoading(false); // to show user the info

                console.log("Data Converted!");
                console.log(lbData); // for debugging

                // FINDING STRONGEST FACTION BELOW
                    
                let knight = 0
                let assassin = 0
                
                // for the length of the data array it sets the knight and assassin to the power dependednt of the character
                for (let i = 0; i < sortedData.length; i++) {
                    if (sortedData[i].character === 1) {
                        knight += sortedData[i].power
                    } else {
                        assassin += sortedData[i].power
                    }
                }

                // sets data on state so it can be globally used
                setAssassinData(assassin)
                setKnightData(knight)

                if (knight > assassin) {
                    setStrongestFac(1)

                } else {
                    setStrongestFac(2)
                }
            }, 1000)
        }
    }, [dataRetrieved, refresh]);

    return (
        <>
        {loading ? (
            <LeaderboardLoading />
        ) : (
            <View style={{ alignItems: 'center'}}>
                <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setRefresh(true)}>
                    <FontAwesome name="refresh" size={24} color="#a4add3" />
                </TouchableOpacity>
                    <Text style={styles.headerText}> {username} </Text>
                    <Text style={styles.statText}> {userPower} </Text>
                </View>

                <View style={styles.compareContainer}>
                    { strongestFac === 1 ? (
                        
                        <View style={{ flexDirection: 'row', gap: wp(1), justifyContent: 'center'}}>

                            <Text style={styles.compareText}> Current Strongest Faction:  </Text>

                            <Text style={styles.compareknight}> 
                                Knight
                            </Text> 

                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', gap: wp(1), justifyContent: 'center'}}>

                            <Text style={styles.compareText}> Current Richest Faction:  </Text>

                            <Text style={styles.compareAssassin}> 
                                Assassin
                            </Text> 
                            
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', gap: wp(1), justifyContent: 'center'}}>
                        <Text style={styles.compareText}> Knight's Power:  </Text>

                        <Text style={styles.statText}> 
                            {knightData}
                        </Text> 
                    </View>

                    <View style={{ flexDirection: 'row', gap: wp(1), justifyContent: 'center'}}>
                        <Text style={styles.compareText}> Assassin's Power:   </Text>

                        <Text style={styles.statText}> 
                            {assassinData}
                        </Text> 
                    </View>

                </View>
                
                <FlatList 
                    contentContainerStyle={styles.flatListContainer}
                    data={lbData?.slice(0,5)} 
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index}) => (

                        <View style={styles.leaderboardSegment}>

                            <Text style={styles.positionText}>
                                {index + 1}.
                            </Text>

                            <View style={{ flexDirection: 'row', gap: wp(1)}}>
                                <Text style={{color:'#a4add3'}}>
                                    -  {item.name} 
                                </Text>

                                { item.character == 1 ? (
                                    <Text style={styles.knight}> 
                                        (Knight)
                                    </Text> 
                                ) : (
                                    <Text style={styles.assassin}> 
                                        (Assassin)
                                    </Text>
                                )} 

                                <Text style={{color: '#a4add3'}}>
                                    - 
                                </Text>
                            </View>
                            <Text style={styles.statText}>
                              {JSON.stringify(item.power)}
                            </Text>
                        </View>
                    )}
                />
            </View>
       
        )}
        </>
    );
}



export default PWRLeaderBoardData

const styles = StyleSheet.create({
    flatListContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: hp(66),
      width: wp(100),
      backgroundColor: '#32243d',
    },
    leaderboardSegment: {
      height: hp(7),
      width: wp(80),
      borderWidth: wp(1),
      borderRadius: wp(10),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#a4add3',
    },
    positionText: {
      fontWeight: '900',
      marginLeft: wp(2.5),
      color: '#a4add3',
    },
    scoreText: {
      fontWeight: '900',
      marginRight: wp(2.5),
      color: '#a4add3',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: hp(1),
        borderTopWidth: hp(1),
        width: wp(100),
        height: hp(10),
        backgroundColor: '#32243d',
        borderColor: '#a4add3',
    },
    headerText: {
        color: '#a4add3',
        fontSize: wp(4),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    knight: {
        color: 'red',
        fontWeight: 'bold'
    },
    assassin: {
        color: 'lime',
        fontWeight: 'bold'
    },
    compareContainer: {
        backgroundColor: '#32243d',
        width: wp(100),
        paddingTop: hp(2),
        gap: hp(1),
    },
    compareText: {
        color: '#a4add3',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: wp(4),
    },
    statText: {
        color: '#9203e7',
        fontWeight: '900',
        textAlign: 'center',
        fontSize: wp(4),
        marginRight: wp(2.5),
    },
    compareAssassin: {
        color: 'lime',
        fontWeight: 'bold',
        fontSize: wp(4),
    },
    compareknight: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: wp(4),
    },
  })