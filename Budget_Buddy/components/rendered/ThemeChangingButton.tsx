
import React from 'react';
import { Pressable, Text } from 'react-native';
import { AppContext } from '../../app/_layout';
import colorLib from '../../constants/colorLib';
import { useGetThemeChangingButtonsStyles } from '../../constants/styles';

export default function ThemeChangeButton ({type}) { // for some reason i cant change the type to string @AGuy21
    const colorContext = React.useContext(AppContext);
    const Colors = colorContext?.Colors;
    const styles = useGetThemeChangingButtonsStyles(Colors);

    const setColors = colorContext?.setColors;

    function handleThemeChange(change: string) {
        setColors(colorLib[change]);
    }

    
    return (
        <Pressable onPress={() => handleThemeChange(type)} style={styles?.themeBtn}>
            <Text style={{ color: Colors?.primary}}>Change to {type} theme</Text>
        </Pressable>
    )
}


