import axios from "axios"; // Axios for making HTTP requests
import { useEffect, useState } from "react"; // React hooks for side effects and state management
import { RepoFolder } from "../types/RepoFolder"; // Custom TypeScript type for repository folders
import { ForbiddenProjects } from "../data/backend"; // List of forbidden projects to exclude from results

/**
 * - This function fetches the main folders of a specified GitHub repository using the GitHub API.
 * - It filters out any folders listed in the `ForbiddenProjects` array and returns the remaining folders as an array of `RepoFolder` objects.
 *
 * @returns {RepoFolder[]} - An array of repository folder objects, filtered based on forbidden projects.
 */
function FetchRepositoryMainFolders(): RepoFolder[] {
  // URL of the GitHub repository that will we use
  //*This will be updated later on when i add more repositories
  const url = `https://api.github.com/repos/AGuy21/Code-Testing/contents/`;

  // State to store the list of repository folders, initialized as an empty array of RepoFolder type
  const [repoFolders, setRepoFolders] = useState<RepoFolder[]>([]);

  /**
   * This hook will run when the component mounts and triggers a fetch request to the GitHub API
   * to get the repository folders. The response is filtered to exclude folders that are listed
   * in the `ForbiddenProjects` array. The filtered list is then stored in the `repoFolders` state.
   */
  useEffect(() => {
    // Axios GET request to fetch the contents of the repository
    axios
      .get(url)
      .then((response) => {
        // Filter out any folders that match the names in the ForbiddenProjects list
        const filteredFolders = response.data.filter(
          (folder: RepoFolder) =>
            !ForbiddenProjects.some(
              (forbidden) => forbidden.name === folder.name
            )
        );
        // set repository folders to the filtered list of folders
        setRepoFolders(filteredFolders);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); //Logs error
      });
  }, [url]); //*Dependency array needs `url` or else it gets angry (eslist error), since it will change array on run it should only run once [url]  === []

  // Return the filtered list of repository folders
  return repoFolders;
}

export default FetchRepositoryMainFolders;
