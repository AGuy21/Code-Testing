
// Emerald / slate theme for dark mode and light mode support.
// Keeps the original green identity (primary + secondary) and adds
// surface / border / accent tokens for the modular UI kit.

import { ColorsType } from "./types/ColorsTypes";

export const Colors: ColorsType = {
    light: {
        primary: '#50c878', 
        secondary: '#2f4f4f', 
        link: '#9370db', 
        background: '#ffffff',
        text: '#000000', 
        surface: '#F2F7F4',
        surfaceElevated: '#E7F0EB',
        border: 'rgba(47, 79, 79, 0.14)',
        borderStrong: 'rgba(80, 200, 120, 0.45)',
        textMuted: '#5C6B64',
        accentSoft: 'rgba(80, 200, 120, 0.16)',
    },

    dark: {
        primary: '#50c878', 
        secondary: '#2f4f4f', 
        link: '#9370db', 
        background: '#121212', 
        text: '#ffffff', 
        surface: '#1A211E',
        surfaceElevated: '#242F2A',
        border: 'rgba(80, 200, 120, 0.16)',
        borderStrong: 'rgba(80, 200, 120, 0.40)',
        textMuted: '#8FA39A',
        accentSoft: 'rgba(80, 200, 120, 0.16)',
    }
};