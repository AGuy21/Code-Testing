import axios from "axios"; // Importing Axios for making HTTP requests
import { useEffect, useState } from "react"; // Importing React hooks for side effects and state management
import { RepoItem } from "../types/RepoItem"; // Importing the custom TypeScript type for repository items

/**
 * - Fetches the contents of a specified folder from a GitHub repository using the GitHub API.
 * - It retrieves both directories and files within the folder and returns them as an array of `RepoItem` objects.
 *
 * @param {string} itemPath - The path of the folder in the repository whose contents are to be fetched.
 * @returns {RepoItem[] | undefined} - An array of `RepoItem` objects representing the folder contents, or undefined if not yet available.
 */
export function GetRepoFolderContents(
  itemPath: string
): RepoItem[] | undefined {
  // Construct the URL to access the contents of the specified folder in the GitHub repository
  //! WE WILL NOT USE: http://localhost:5173/projects/App/components WE USE EVERYTHING PAST /projects !! Ex: We fetch https:.../App/components
  const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/${itemPath}`;

  // State to store the contents of the repository folder, initialized as undefined
  const [repoFolerContent, setRepoFolderContent] = useState<RepoItem[]>([]);

  /**
   * This runs to fetch the folder contents from the GitHub API when the component mounts. (not when url changes since it doensn't change during function)
   * It processes the response to separate directories and files.
   */
  useEffect(() => {
    // Perform the Axios GET request to fetch the folder contents
    axios
      .get(url)
      .then((response) => {
        // Filter the response data to separate directories from files
        const repoFileDir: RepoItem[] = response.data.filter(
          (file: RepoItem) => file.type === "dir" // Select items that are directories
        );
        const repoFileCode: RepoItem[] = response.data.filter(
          (file: RepoItem) => file.type === "file" // Select items that are files
        );

        // Check if no directories or files were found and throw an error if true
        if (!repoFileCode.length && !repoFileDir.length) {
          throw new Error("Couldn't Fetch This Folder's Data");
        }

        // Concatenate the directories and files arrays so the folders are ontop of the files when shown
        setRepoFolderContent(repoFileDir.concat(repoFileCode));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); //Log any errors
      });
  }, [url]); //*Dependency array needs `url` or else it gets angry (eslist error), since it will change array on run it should only run once [url]  === []

  // Return the ordered contents of the repository folder
  return repoFolerContent;
}
