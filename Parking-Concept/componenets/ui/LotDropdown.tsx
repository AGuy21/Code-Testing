import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import useDocData from "../hooks/useDocData";
import { theme } from "../../constants/theme";

interface LotDropdownProps {
  onLotSelect: (lotId: string) => void;
  startingLot?: string;
}

const LotDropdown = ({ onLotSelect, startingLot }: LotDropdownProps) => {
  const { lots, loading } = useDocData();
  const [selectedLot, setSelectedLot] = useState<string | null>(startingLot || null);

  useEffect(() => {
    if (startingLot !== undefined) {
      setSelectedLot(startingLot || null);
    }
  }, [startingLot]);

  const dropdownLots = lots.map((lot) => ({
    ...lot,
    label: typeof lot.name === "string" && lot.name.trim() ? lot.name : lot.id,
  }));

  return (
    <View>
      <Dropdown
        data={dropdownLots}
        labelField="label"
        valueField="id"
        placeholder={
          loading
            ? "Loading lots..."
            : lots.length === 0
              ? "No lots available"
              : "Select a parking lot"
        }
        onChange={(item) => {
          setSelectedLot(item.id);
          onLotSelect(item.id);
        }}
        value={selectedLot}
        style={styles.dropdown}
        containerStyle={styles.dropdownMenu}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        activeColor={theme.colors.accentSoft}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor={theme.colors.textSecondary}
        searchPlaceholderTextColor={theme.colors.textMuted}
        disable={loading || lots.length === 0}
        dropdownPosition="top"
        search
        maxHeight={300}
        searchPlaceholder="Search lots..."
      />
    </View>
  );
};

export default LotDropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    minHeight: 52,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  dropdownMenu: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  itemContainer: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
  },
  itemText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 0,
    borderColor: theme.colors.surfaceElevated,
    borderRadius: theme.radii.sm,
  },
});
