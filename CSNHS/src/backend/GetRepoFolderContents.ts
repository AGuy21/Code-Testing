
import axios from "axios";
import { useEffect, useState } from "react";
import { RepoItem } from "../types/RepoItem";

export function GetRepoFolderContents(itemPath: string) {

    const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/${itemPath}`; // URL to fetch repo contents
    const [repoFolerContent, setRepoFolderContent] = useState<RepoItem[]>(); // the repo folders with custom RepoFile type in array

    // Automatically get the repositories from GitHub API
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                const repoFileDir: RepoItem[] = response.data.filter((file: RepoItem) => 
                    file.type === 'dir'
                );
                const repoFileCode: RepoItem[] = response.data.filter((file: RepoItem) => 
                    file.type === 'file'
                );
                if (!repoFileCode && !repoFileDir) {
                    throw Error("Couldn't Fetch This Files Data")
                }
                setRepoFolderContent(repoFileDir.concat(repoFileCode))
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [url]);

    return repoFolerContent; 
}