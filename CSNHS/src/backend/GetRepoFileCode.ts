import axios from "axios";
import { useEffect, useState } from "react";
import { RepoItem } from "../types/RepoItem";

export function GetRepoFileCode(itemPath: string) {
    const [filesCode, setFilesCode] = useState<RepoItem | null>(null); // Use null for initial state

    useEffect(() => {
        const actualPath = itemPath.replace('/code', ''); // This should already be stripped of '/code'
        const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/${actualPath}`; // URL to fetch repo contents

        // Fetch data from GitHub API
        axios
            .get(url)
            .then((response) => {
                setFilesCode(response.data); // Assuming response.data is of type RepoItem
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [itemPath]); // Depend only on itemPath

    return filesCode; 
}
