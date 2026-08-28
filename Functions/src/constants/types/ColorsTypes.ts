
export interface ThemePalette {
    primary: string;
    secondary: string;
    link: string;
    background: string;
    text: string;
    /** Card / sheet surface. */
    surface: string;
    /** Raised surface (inputs, chips). */
    surfaceElevated: string;
    /** Hairline borders. */
    border: string;
    /** Stronger borders (focused inputs, accent cards). */
    borderStrong: string;
    /** Dimmed secondary text. */
    textMuted: string;
    /** Translucent emerald fill for soft highlights. */
    accentSoft: string;
}

export interface ColorsType {
    light: ThemePalette;
    dark: ThemePalette;
}