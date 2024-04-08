import {  Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

const Time = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <Text>{currentTime}</Text>
    </View>
  );
};

export default Time;

