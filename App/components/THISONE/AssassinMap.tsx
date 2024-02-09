import {Text, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// imported styles
import globalStyles from '../../styles/globalStyles';
import { COLORS } from '../../styles/COLORS';
import { doc } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { TransmutatorContext, UserContext, CountContext } from '../../app/_layout';
import { router } from 'expo-router';

function AssassinMap() {
        const { top, bottom } = useSafeAreaInsets()
    // variables listed here
        const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
        const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email) // document refrence for user data fetching and saving
        
    // contexts listed here
        const transContext = React.useContext(TransmutatorContext)
        const userContext = React.useContext(UserContext)    // context states
        const user = userContext?.username
        const power = transContext?.power
        const captures = userContext?.captures
    // all button states used to track if captured or not
        const capture1 = userContext?.capture1
        const capture2 = userContext?.capture2
        const capture3 = userContext?.capture3
        const capture4 = userContext?.capture4
        const capture5 = userContext?.capture5
        const capture6 = userContext?.capture6
        const capture7 = userContext?.capture7
        const capture8 = userContext?.capture8
        const capture9 = userContext?.capture9
        const capture10 = userContext?.capture10
        const capture11 = userContext?.capture11
        const capture12 = userContext?.capture12

    // all button contexts
        const handleCapture1 = userContext?.handleCapture1
        const handleCapture2 = userContext?.handleCapture2
        const handleCapture3 = userContext?.handleCapture3
        const handleCapture4 = userContext?.handleCapture4
        const handleCapture5 = userContext?.handleCapture5
        const handleCapture6 = userContext?.handleCapture6
        const handleCapture7 = userContext?.handleCapture7
        const handleCapture8 = userContext?.handleCapture8
        const handleCapture9 = userContext?.handleCapture9
        const handleCapture10 = userContext?.handleCapture10
        const handleCapture11 = userContext?.handleCapture11
        const handleCapture12 = userContext?.handleCapture12

    function BeginningHidden() {
        return (
            <LinearGradient style={{ width: deviceWidth * 2, height: deviceHeight/7 }}colors={[ 'rgba(0,0,0,0)', COLORS.background1]}>

            </LinearGradient>
        )
    }
    useEffect(() => {
        router.push('/MapInfo')
    },[])
    return(
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
            <ScrollView horizontal= {true} showsHorizontalScrollIndicator={false}>
            <View style={{ height: top, backgroundColor: COLORS.knight }} />

                <LinearGradient 
                    colors={[ COLORS.assassin, COLORS.background2, COLORS.background2, COLORS.background1, COLORS.background2, COLORS.background2, COLORS.knight]}
                    style={{ alignItems: 'baseline', justifyContent: 'space-evenly', width: deviceWidth*2,}}
                >

                <View style={globalStyles.margin} />
                <View style={globalStyles.margin} />
                <View style={globalStyles.margin} />

                <View style={globalStyles.explorationButtonSpacerRow}>
                    <View style={globalStyles.rowSpacer4} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer} />

                    <TouchableOpacity style={globalStyles.explorationCapturedButton2} onPress={() => console.log(captures)}>
                        <Text style={globalStyles.BaseButtonText}> {user}'s base</Text>
                        <Text style={globalStyles.BaseButtonText}> { power } Power </Text>
                    </TouchableOpacity>
                </View>


                <View style={globalStyles.explorationButtonSpacerRow}>
                    <View style={globalStyles.rowSpacer4} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer3} />

                    <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture1 && globalStyles.explorationCapturedButton2]} 
                        onPress={handleCapture1} disabled={capture1} 
                    >
                        <Text style={globalStyles.BaseButtonText}> Mini Knight Camp</Text>
                        <Text style={globalStyles.BaseButtonText}> 10 Power </Text>
                    </TouchableOpacity>
                </View>

                { captures < 1 ? (
                    <>
                        { captures === 0 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <>
                        <View style={globalStyles.explorationButtonSpacerRow}>
                            <View style={globalStyles.rowSpacer4} />
                            <View style={globalStyles.rowSpacer3} />
                            <View style={globalStyles.rowSpacer3} />
                            <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture2 && globalStyles.explorationCapturedButton2]} 
                                onPress={handleCapture2} disabled={capture2} 
                            >
                                <Text style={globalStyles.BaseButtonText}> Knight Camp </Text>
                                <Text style={globalStyles.BaseButtonText}> 25 Power </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                { captures < 2 ? (
                    <>
                        { captures === 1 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer2} />
                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture3 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture3} disabled={capture3} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight Camp </Text>
                            <Text style={globalStyles.BaseButtonText}> 40 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 3 ? (
                    <>
                        { captures === 2 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer3} />
                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture4 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture4} disabled={capture4} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight Watchtower </Text>
                            <Text style={globalStyles.BaseButtonText}> 50 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 4 ? (
                    <>
                        { captures === 3 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture5 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture5} disabled={capture5} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight Watchtower </Text>
                            <Text style={globalStyles.BaseButtonText}> 75 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 5 ? (
                    <>
                        { captures === 4 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer4} />

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture6 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture6} disabled={capture6} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight Barracks </Text>
                            <Text style={globalStyles.BaseButtonText}> 100 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 6 ? (
                    <>
                        { captures === 5 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer3} />
                        <View style={globalStyles.rowSpacer3} />

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture7 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture7} disabled={capture7} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight Barracks </Text>
                            <Text style={globalStyles.BaseButtonText}> 125 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 7 ? (
                    <>
                        { captures === 6 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer3} />
                        <View style={globalStyles.rowSpacer3} />
                        <View style={globalStyles.rowSpacer3} />


                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture8 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture8} disabled={capture8} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight's Town </Text>
                            <Text style={globalStyles.BaseButtonText}> 150 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 8 ? (
                    <>
                        { captures === 7 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer3} />
                        <View style={globalStyles.rowSpacer} />

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture9 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture9} disabled={capture9} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight's Town </Text>
                            <Text style={globalStyles.BaseButtonText}> 200 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 9 ? (
                    <>
                        { captures === 8 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer3} />
                        <View style={globalStyles.rowSpacer} />

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture10 && globalStyles.explorationCapturedButton2]} 
                            onPress={handleCapture10} disabled={capture10} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight's City </Text>
                            <Text style={globalStyles.BaseButtonText}> 250 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 10 ? (
                    <>
                        { captures === 9 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <>
                    <View style={globalStyles.explorationButtonSpacerRow}>
                        <View style={globalStyles.rowSpacer4} />
                        <View style={globalStyles.rowSpacer3} />

        
                        <TouchableOpacity style={[globalStyles.explorationCaptureButton2, capture11 && globalStyles.explorationCapturedButton2]}
                            onPress={handleCapture11} disabled={capture11} 
                        >
                            <Text style={globalStyles.BaseButtonText}> Knight's Base </Text>
                            <Text style={globalStyles.BaseButtonText}> 500 Power </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: deviceHeight/20}} />
                    </>
                )}

                { captures < 11 ? (
                    <>
                        { captures === 10 ? (
                            <>
                            <BeginningHidden />
                            <View style={{ backgroundColor: 'red', flex: 1 }} />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <>
                        <View style={globalStyles.explorationButtonSpacerRow}>

                            <View style={globalStyles.rowSpacer3} />
                            <View style={globalStyles.rowSpacer3} />
                            <View style={globalStyles.rowSpacer3} />
                            <View style={globalStyles.rowSpacer} />

                            <TouchableOpacity style={[globalStyles.explorationEndCaptureButton2, capture12 && globalStyles.explorationCapturedButton2]}
                                onPress={handleCapture12} disabled={capture12}
                            >
                                <Text style={globalStyles.BaseButtonText}> Knight's Capital </Text>
                                <Text style={globalStyles.BaseButtonText}> 1000 Power </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={globalStyles.margin} />
                        <View style={globalStyles.margin} />
                        <View style={globalStyles.margin} />
                        <View style={globalStyles.smallMargin} />
                    </>
                    )
                }
                

                </LinearGradient>
            </ScrollView>
            </ScrollView>
        </>
    )
}

export default AssassinMap;

const styles = StyleSheet.create({
    hidden: {
        width: deviceWidth * 2,
        height: deviceHeight/7,
        backgroundColor: COLORS.background1
    },
})