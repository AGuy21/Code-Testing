/**
 * - This is a utility function used to take in a repository folder and return true if it has a README file if not returns false
 *
 * @param RepoFolder = The repository folder to be checked for README in the function
 * @returns {boolean} - true if has README file false otherwise
 */

import { RepoFolder } from "../types/RepoFolder";

export function containsReadMeFile(RepoFolder: RepoFolder[]) {
  RepoFolder.forEach((item) => {
    console.log(item.name + ' === About.md' )
    if (item.name === "About.md") {
      return true;
    }
  });
  return false;
}
