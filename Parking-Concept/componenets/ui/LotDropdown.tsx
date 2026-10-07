import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import useDocData from "../hooks/useDocData";
import { theme } from "../../constants/theme";

const LotDropdown = () => {
  const { lots, loading } = useDocData();
  const [selectedLot, setSelectedLot] = React.useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (selectedLot || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <View>
      <Dropdown
        data={lots}
        labelField="name"
        valueField="id"
        placeholder={!isFocus ? "Select item" : "..."}
        onChange={(item) => {
          console.log("Selected lot:", item);
          setSelectedLot(item);
        }}
        value={selectedLot}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        maxHeight={300}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

export default LotDropdown;

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: theme.colors.background,
    borderRadius: theme.radii.md,
    padding: 10,
    marginBottom: 20,
    color: theme.colors.textPrimary,
    ...theme.typography.label,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
