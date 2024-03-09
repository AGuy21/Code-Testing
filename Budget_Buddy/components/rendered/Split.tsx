import { View, Text } from "react-native";
import React from "react";
import { AppContext } from "../../app/_layout";
import { useGetSplitStyles } from "../../constants/styles";
/**
 * Renders a split component with a line and text in the middle.
 */

const Split = () => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetSplitStyles(Colors);
  return (
    <View style={styles.split}>
      <View style={styles.splitLine} />
      <Text style={styles.splitText}>Don't have an account?</Text>
      <View style={styles.splitLine} />
    </View>
  );
};

export default Split;
