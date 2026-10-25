import { FieldValue, Timestamp } from "firebase/firestore";
export interface Car {
    Plate: string;
    Make: string;
    Color: string;
    Start: Timestamp | FieldValue;
    Prepayment: number;

}
export interface LotDataType {
    Cars: Car[]
    Price: number;
    Hours: number;
}