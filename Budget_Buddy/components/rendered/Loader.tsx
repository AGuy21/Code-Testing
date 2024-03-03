import React, {} from 'react';
import { ActivityIndicator, Text} from 'react-native';
import { AppContext } from '../../app/_layout';
import { useGetLoaderStyles } from '../../constants/styles';

/**
 * Renders a loader component with an activity indicator and a loading text.
 * @returns JSX.Element
 */
export default function Loader() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetLoaderStyles(Colors);

  return (
    <>
      <ActivityIndicator 
        size={'large'}
        color={Colors?.primary}
        style={{ alignSelf: 'center'}}
      />
      <Text style={styles.text}>
        Loading Data...
      </Text>
    </>
  );
}
