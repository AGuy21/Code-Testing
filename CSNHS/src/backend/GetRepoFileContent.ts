import axios from "axios";
import { useEffect, useState } from "react";
import { RepoFile } from "../types/RepoFile";

export function GetRepoFileContent(itemPath: string) {
    const [FileContent, setFileContent] = useState<RepoFile>(); // Use null for initial state

    useEffect(() => {
        const actualPath = itemPath.replace('/code', ''); // This should already be stripped of '/code'
        const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/${actualPath}`; // URL to fetch repo contents

        // Fetch data from GitHub API
        axios
            .get(url)
            .then((response) => {
                setFileContent(response.data); // Assuming response.data is of type RepoItem
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [itemPath]); // Depend only on itemPath

    return FileContent; 
}
