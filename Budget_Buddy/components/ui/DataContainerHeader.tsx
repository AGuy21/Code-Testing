import { View, Text } from "react-native";
import React from "react";
import { AppContext } from "../../app/_layout";
import { useGetDataContainerHeaderStyles } from "../../constants/styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const DataContainerHeader = () => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetDataContainerHeaderStyles(Colors);

  return (
    <View style={styles.container}>
      <View style={[styles.itemSegment, { borderTopLeftRadius: wp(10) }]}>
        <Text style={styles.text}>Name</Text>
      </View>
      <View style={[styles.itemSegment, { borderLeftWidth: 0 }]}>
        <Text style={styles.text}>Frequency</Text>
      </View>
      <View style={[styles.itemSegment, { borderRightWidth: 0 }]}>
        <Text style={styles.text}>$/Freq</Text>
      </View>
      <View style={[styles.itemSegment, { borderTopRightRadius: wp(10) }]}>
        <Text style={styles.text}>$/Month</Text>
      </View>
    </View>
  );
};

export default DataContainerHeader;
