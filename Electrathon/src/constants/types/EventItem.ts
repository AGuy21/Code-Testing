export interface EventItem {
    title: string;
    date: string;
    time: string;
    description: string;
    location: string;
    type?: "Race" | "Practice" | "Workshop";
    trackLayoutUrl?: string; // Optional URL for track image
    logoUrl?: string; // Optional URL for event logo
}