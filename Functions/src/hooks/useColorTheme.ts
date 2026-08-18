import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';

export function useColorTheme(colorName: keyof typeof Colors.light): string {
  const scheme = useColorScheme();
  const theme = scheme === 'light' || scheme === 'dark' ? scheme : 'dark';

  const [color, setColor] = useState<string>(Colors[theme][colorName]);

  useEffect(() => {
    setColor(Colors[theme][colorName]);
  }, [theme, colorName]);

  return color;
}