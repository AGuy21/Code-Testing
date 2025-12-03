import React, { useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../FirebaseConfig";
import type { SponsorItem } from "../constants/types/SponsorItem";

function GetSponsorData() {
    const [sponsorData, setSponsorData] = React.useState<SponsorItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchSponsorData();
    }, []);

    async function fetchSponsorData() {
        try {
            const sponsorsCol = collection(db, 'Sponsors');
            const sponsorSnapshot = await getDocs(sponsorsCol);
            
            const newSponsorData = sponsorSnapshot.docs.map(doc => {
                return doc.data() as SponsorItem;
            });

            setSponsorData(newSponsorData);
        } catch (error) {
            console.error("Error fetching sponsors:", error);
        } finally {
            setLoading(false);
        }
    }

    return { sponsors: sponsorData, loading };
}

export default GetSponsorData;