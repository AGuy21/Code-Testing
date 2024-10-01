import axios from "axios";
import { useEffect, useState } from "react";
import { RepoFolder } from "../types/RepoFolder";


function FetchRepositoryMainFolders() {
    const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/`;
    const [repoFolders, setRepoFolders] = useState<RepoFolder[]>([]);
  
    useEffect(() => {
      axios
        .get(url)
        .then((response) => {
          setRepoFolders(response.data);
        })
        .catch((error) => {
          throw Error("error fetching data: " + error);
        });
    }, [url]);
    
    return repoFolders;
}


export default FetchRepositoryMainFolders
