import React, { useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../FirebaseConfig";
import type { SponsorItem } from "../constants/types/SponsorItem";

function GetSponsorData() {
    const [sponsorData, setSponsorData] = React.useState<SponsorItem[]>([]);

    useEffect(() => {
        fetchSponsorData();
    }, []);

    async function fetchSponsorData() {
        const sponsorsCol = collection(db, 'Sponsors');
        const sponsorSnapshot = await getDocs(sponsorsCol);
        sponsorSnapshot.forEach((doc) => {
            setSponsorData([...sponsorData, doc.data() as SponsorItem]);
        });
    }

    return sponsorData;
}

export default GetSponsorData;