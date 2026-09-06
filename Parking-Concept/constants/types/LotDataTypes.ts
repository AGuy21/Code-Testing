
export interface Car {
    Plate: string;
    Time: string;
}
export interface LotDataType {
    Cars: Car[]
    HourlyRate: number;
    TakenSpots: number;
    TotalSpots: number;
}