import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AppContext } from "../../app/_layout";
import { useGetFilterButtonRowStyles } from "../../constants/styles";

/**
 * Props for the ButtonRow component.
 */
interface FilterButtonRowProps {
  /**
   * Function to send data to the parent component.
   * @param name - The name to be sent to the parent component.
   */
  sendDataToParent: (name: string) => void;
}

/**
 * ButtonRow component renders a row of filter buttons.
 * @param {Object} props - The component props.
 * @param {Function} props.sendDataToParent - A function to send data to the parent component.
 * @returns {JSX.Element} - The rendered ButtonRow component.
 */
const FilterButtonRow: React.FC<FilterButtonRowProps> = ({
  sendDataToParent,
}: {
  sendDataToParent: Function;
}): JSX.Element => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetFilterButtonRowStyles(Colors);

  const [show, setShow] = useState<string>("All");

  /**
   * Handles the click event of a filter button.
   * @param {string} name - The type of data to show.
   */
  function handleShow(name: string) {
    setShow(name);
    sendDataToParent(name);
  }

  /**
   * Renders a filter button.
   * @param {boolean} active - Indicates if the button is active.
   * @param {string} name - The name of the button.
   * @returns {JSX.Element} - The rendered filter button.
   */

  const FilterButton = ({ active, name }) => {
    if (active) {
      return (
        <TouchableOpacity style={styles.activeButton}>
          <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleShow(name)}
        >
          <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.buttonRow}>
      {show === "All" ? (
        <FilterButton active={true} name="All" />
      ) : (
        <FilterButton active={false} name="All" />
      )}
      {show === "Income" ? (
        <FilterButton active={true} name="Income" />
      ) : (
        <FilterButton active={false} name="Income" />
      )}
      {show === "Expense" ? (
        <FilterButton active={true} name="Expense" />
      ) : (
        <FilterButton active={false} name="Expense" />
      )}
    </View>
  );
};

export default FilterButtonRow;
