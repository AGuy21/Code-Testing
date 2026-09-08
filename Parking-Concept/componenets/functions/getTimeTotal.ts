import { Timestamp } from 'firebase/firestore';
import { Car } from '../../constants/types/LotDataTypes';

export default async function getTimeTotal(docData: Car) {
    const createdAt = docData.Start;

    if (!(createdAt instanceof Timestamp)) {
        console.log("Timestamp is still syncing with the server...");
        return;
    }

    const localTimeMs = Date.now();

    const context = globalThis as any;
    const firebaseClockOffset = context._firestoreServerTimeOffset || 0;

    const secureCurrentTimeMs = localTimeMs + firebaseClockOffset;

    const diffInMs = secureCurrentTimeMs - createdAt.toMillis();
    const diffInMinutes = diffInMs / (1000 * 60);

    console.log(`Time elapsed: ${diffInMinutes} minutes`);
    return diffInMinutes;
}
