import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../Configs/FirebaseConfig";
import { Car } from "../../constants/types/LotDataTypes";

export async function backupCar(
	carId: string,
	lotId: string,
	carData: Car,
): Promise<string> {
	const car = carData ?? undefined;
	if (!car) throw new Error(`Car ${carId} was not found.`);

	const lotSnapshot = await getDoc(doc(db, "Lots", lotId));
	const lot = lotSnapshot.exists() ? lotSnapshot.data() : null;
	const now = new Date();
	const pad = (value: number) => String(value).padStart(2, "0");
	const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
	const date = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${now.getFullYear()}`;
	const safe = (value: unknown) => String(value ?? "Unknown").replace(/[^a-zA-Z0-9_-]/g, "_");
	const backupId = `${time}-${date}-${safe(carData.Make)}-${safe(carData.Color)}-${safe(carData.Plate)}-${safe(lot?.name ?? lotId)}`;

	await setDoc(doc(db, "Backups", backupId), {
		...carData,
		carId,
		deletedFromLotId: lotId,
		deletedFromLot: lot,
		backedUpAt: serverTimestamp(),
	});
	return backupId;
}

export default backupCar;
