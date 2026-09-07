import { FieldValue, Timestamp } from "firebase/firestore";
export interface Car {
    Plate: string;
    Start: Timestamp | FieldValue;
    Password: string;
}
export interface LotDataType {
    Cars: Car[]
    HourlyRate: number;
    TakenSpots: number;
    TotalSpots: number;
}