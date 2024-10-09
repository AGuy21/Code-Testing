
import axios from "axios";
import { useEffect, useState } from "react";
import { RepoFolder } from "../types/RepoFolder";
import { ForbiddenProjects } from "../data/backend";

function FetchRepositoryMainFolders() {
    const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/`; //Url to be used to fetch repos
    const [repoFolders, setRepoFolders] = useState<RepoFolder[]>([]); //the repo folders with cutstom RepoFolder type in array
    //Will automatically get the repositories from github api
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                // Filter the folders after fetching
                const filteredFolders = response.data.filter((folder: RepoFolder) => 
                    !ForbiddenProjects.some(forbidden => forbidden.name === folder.name)
                );
                setRepoFolders(filteredFolders);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [url]);

    return repoFolders; 
}

export default FetchRepositoryMainFolders;



