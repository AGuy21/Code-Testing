
import React, { useState } from 'react'
import LeaderBoardData from '../../../components/THISONE/LeaderBoardData';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PWRLeaderBoardData from '../../../components/THISONE/PWRLeaderBoardData';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Leaderboard = () => {

  const [ leaderboard, setLeaderboard ] = useState(1);
  return (
    <>
      <Tabs.Screen options={{
        headerLeft: () => (
          // when pressed goes to dark Matter leaderboard
          <TouchableOpacity onPress={() => setLeaderboard(1)} style={{ paddingLeft: wp(5)}}>
            <MaterialIcons  name='attach-money' size={24} color='#a4add3' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          // when pressed goes to power leaderboard
          <TouchableOpacity onPress={() => setLeaderboard(2)} style={{ paddingRight: wp(5)}}> 
            <MaterialCommunityIcons  name='sword-cross' size={24} color='#a4add3' />
          </TouchableOpacity>
        ),
      }}
      />
        { leaderboard === 1 ? (
          <LeaderBoardData />
        ) : (
          <PWRLeaderBoardData />
        )}
    </>
  );
};

export default Leaderboard