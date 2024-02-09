import {Text, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from 'react-native-gesture-handler';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// imported styles
import globalStyles from '../../styles/globalStyles';
import { COLORS } from '../../styles/COLORS';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransmutatorContext, UserContext } from '../../app/_layout';
import { router } from 'expo-router';

function ExplorationScreen() {
        const { top } = useSafeAreaInsets()
    // variables listed here
        
    // contexts listed here
        const transContext = React.useContext(TransmutatorContext)
        const userContext = React.useContext(UserContext)
    // context states
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
            <LinearGradient style={{ width: deviceWidth * 2, height: deviceHeight/7 }}colors={[  COLORS.background1, 'rgba(0,0,0,0)' ]}>

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

                <View style={{ height: top, backgroundColor: COLORS.assassin }} />

                <LinearGradient 
                    colors={[ COLORS.assassin, COLORS.background2, COLORS.background2, COLORS.background1, COLORS.background2, COLORS.background2, COLORS.knight]}
                    style={{ alignItems: 'baseline', justifyContent: 'space-evenly', width: deviceWidth*2,}}
                >


                { captures < 11 ? (
                    <>
                        { captures === 10 ? (
                            <>
                                <BeginningHidden />
                            </>
                        ) : (
                        <>
                            <View style={styles.hidden} />
                        </>

                        )}
                    </>
                ) : (
                    <>
                        <View style={globalStyles.margin} />
                        <View style={globalStyles.margin} />
                        <View style={globalStyles.margin} />
                        <View style={globalStyles.explorationButtonSpacerRow}>
                            <View style={globalStyles.rowSpacer4} />
                            <View style={globalStyles.rowSpacer3} />
                            <View style={globalStyles.rowSpacer3} />
                            <View style={globalStyles.rowSpacer} />

                            <TouchableOpacity style={[globalStyles.explorationEndCaptureButton, capture12 && globalStyles.explorationCapturedButton]} 
                                onPress={handleCapture12} disabled={capture12}
                            >
                                <Text style={globalStyles.BaseButtonText}> Assassin's Guild </Text>
                                <Text style={globalStyles.BaseButtonText}> 1000 Power </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                { captures < 10 ? (
                    <>
                        { captures === 9 ? (
                            <>
                                <BeginningHidden />
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
                        <View style={globalStyles.rowSpacer3} />

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture11 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture11} disabled={capture11}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin's Base</Text>
                            <Text style={globalStyles.BaseButtonText}> 500 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 9 ? (
                    <>
                        { captures === 8 ? (
                            <>
                                <BeginningHidden />
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
                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture10 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture10} disabled={capture10}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin City </Text>
                            <Text style={globalStyles.BaseButtonText}> 250 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 8 ? (
                    <>
                        { captures === 7 ? (
                            <>
                                <BeginningHidden />
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
                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture9 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture9} disabled={capture9}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin's Town 2 </Text>
                            <Text style={globalStyles.BaseButtonText}> 200 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 7 ? (
                    <>
                        { captures === 6 ? (
                            <>
                                <BeginningHidden />
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
                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture8 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture8} disabled={capture8}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin's Town </Text>
                            <Text style={globalStyles.BaseButtonText}> 150 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 6 ? (
                    <>
                        { captures === 5 ? (
                            <>
                                <BeginningHidden />
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

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture7 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture7} disabled={capture7}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin Outpost </Text>
                            <Text style={globalStyles.BaseButtonText}> 125 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 5 ? (
                    <>
                        { captures === 4 ? (
                            <>
                                <BeginningHidden />
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

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture6 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture6} disabled={capture6}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin Outpost </Text>
                            <Text style={globalStyles.BaseButtonText}> 100 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 4 ? (
                    <>
                        { captures === 3 ? (
                            <>
                                <BeginningHidden />
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

                    <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture5 && globalStyles.explorationCapturedButton]} 
                        onPress={handleCapture5} disabled={capture5}
                    >
                        <Text style={globalStyles.BaseButtonText}> Assassin Watchtower </Text>
                        <Text style={globalStyles.BaseButtonText}> 75 Power </Text>
                    </TouchableOpacity>
                </View>
                )}
                { captures < 3 ? (
                    <>
                        { captures === 2 ? (
                            <>
                                <BeginningHidden />
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


                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture4 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture4} disabled={capture4}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin Watchtower </Text>
                            <Text style={globalStyles.BaseButtonText}> 50 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                { captures < 2 ? (
                    <>
                        { captures === 1 ? (
                            <>
                                <BeginningHidden />
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

                        <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture3 && globalStyles.explorationCapturedButton]} 
                            onPress={handleCapture3} disabled={capture3}
                        >
                            <Text style={globalStyles.BaseButtonText}> Assassin's Hideout </Text>
                            <Text style={globalStyles.BaseButtonText}> 40 Power </Text>
                        </TouchableOpacity>
                    </View>
                )}
                
                { captures < 1 ? (
                    <>
                        { captures === 0 ? (
                            <>
                                <BeginningHidden />
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

                    <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture2 && globalStyles.explorationCapturedButton]} 
                        onPress={handleCapture2} disabled={capture2}
                    >
                        <Text style={globalStyles.BaseButtonText}> Assassin's Hideout </Text>
                        <Text style={globalStyles.BaseButtonText}> 25 Power </Text>
                    </TouchableOpacity>
                </View>
                )}

                <View style={globalStyles.explorationButtonSpacerRow}>
                    <View style={globalStyles.rowSpacer4} />
                    <View style={globalStyles.rowSpacer3} />

    
                    <TouchableOpacity style={[globalStyles.explorationCaptureButton, capture1 && globalStyles.explorationCapturedButton]}
                        onPress={handleCapture1} disabled={capture1}
                    >
                        <Text style={globalStyles.BaseButtonText}> Assassin's Camp </Text>
                        <Text style={globalStyles.BaseButtonText}> 10 Power </Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ marginTop: deviceHeight/20}} />
                <View style={globalStyles.explorationButtonSpacerRow}>

                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer3} />
                    <View style={globalStyles.rowSpacer} />

                    <TouchableOpacity style={globalStyles.explorationCapturedButton}>
                            <Text style={globalStyles.BaseButtonText}> {user}'s Base </Text>
                            <Text style={globalStyles.BaseButtonText}> { power } Power </Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.margin} />
                <View style={globalStyles.margin} />
                <View style={globalStyles.margin} />
                <View style={globalStyles.smallMargin} />

                </LinearGradient>
            </ScrollView>
            </ScrollView>
        </>
    )
}

export default ExplorationScreen;

const styles = StyleSheet.create({
    hidden: {
        width: deviceWidth * 2,
        height: deviceHeight/7,
        backgroundColor: COLORS.background1
    },
})