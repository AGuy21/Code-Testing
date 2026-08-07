import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';

export function useColorTheme(
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {

    const theme = useColorScheme(); //checks if it is light or dark mode and sets the theme accordingly, catch all is dark
    
    const [color, setColor] = useState(Colors[theme][colorName]);


    useEffect(() => {
        setColor(Colors[theme][colorName]);
    }, [theme, colorName]);

    return color;
}