import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from "../constants/";
import type { ThemePalette } from '../constants/types/ColorsTypes';

type SchemeName = 'light' | 'dark';

/** Resolves the active color scheme, defaulting to dark. */
function useActiveScheme(): SchemeName {
  const scheme = useColorScheme();
  return scheme === 'light' || scheme === 'dark' ? scheme : 'dark';
}

export function useColorTheme(colorName: keyof typeof Colors.light): string {
  const scheme = useActiveScheme();
  const theme = scheme === 'light' || scheme === 'dark' ? scheme : 'dark';

  const [color, setColor] = useState<string>(Colors[theme][colorName]);

  useEffect(() => {
    setColor(Colors[theme][colorName]);
  }, [theme, colorName]);

  return color;
}

/** Returns the full palette for the active scheme (for components needing several colors). */
export function useThemePalette(): ThemePalette {
  const scheme = useActiveScheme();
  return Colors[scheme];
}