import axios from "axios"; // Axios for making HTTP requests
import { useEffect, useState } from "react"; // React hooks for side effects and state management
import { RepoFile } from "../types/RepoFile"; // Custom TypeScript type for repository files
import { ErrorContent } from "../data/backend";

/**
 * - Fetches the content of a specific file from a GitHub repository using the GitHub API.
 * - The file is specified by its path (`itemPath`). The content of the file is returned as a `RepoFile` object.
 *
 * @param {string} itemPath - The path of the file in the repository, which will be used to fetch it's content.
 * @returns {RepoFile} - Returns the content of the file as a `RepoFile` object, or ErrorContent if an error has occured.
 */
export function GetRepoFileContent(itemPath: string): RepoFile {
  // State to store the content of the fetched file, initially is ErrorContent since if it doesn't change the content an error has occured
  const [FileContent, setFileContent] = useState<RepoFile>(ErrorContent);

  /**
   * - This hook will  fetch data from the GitHub API when the `itemPath` changes.
   * - It constructs a URL based on the repository path and retrieves the file's content.
   */
  useEffect(() => {
    // Clean up the path by removing '/code', we do this so we can fetch the data without errors
    //*Ex: http://localhost:5173/projects/App/components/EditScreenInfo.tsx/code == http://localhost:5173/projects/App/components/EditScreenInfo.tsx
    //! WE WILL NOT USE: http://localhost:5173/projects/App/components/EditScreenInfo.tsx WE USE EVERYTHING PAST /projects !! Ex: We fetch https:.../App/components/EditScreenInfo.tsx
    const actualPath = itemPath.replace("/code", "");

    // Construct the GitHub API URL to get the file's contents
    //*Ex: http://localhost:5173/projects/App/components/EditScreenInfo.tsx WILL BECOME => https://api.github.com/repos/AGuy21/Code-Testing/contents/App/components/EditScreenInfo.tsx
    const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/${actualPath}`;

    // Perform the Axios GET request to fetch the file's content
    axios
      .get(url)
      .then((response) => {
        // Set the file content in the state using the response from GitHub's API
        setFileContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); //Log any errors that occur
      });
  }, [itemPath]); //*Dependency array needs `itemPath` or else it gets angry (eslist error), since it will change array on run it should only run once [itemPath]  === []

  // Return the file content stored in the state
  return FileContent;
}
