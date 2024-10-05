import { useParams } from "react-router-dom";
import { GetRepoFileContent } from "../backend/GetRepoFileContent";


const RepositoryFile = () => {
  
  const { "*": repoItemPath } = useParams();
  const actualFilePath = repoItemPath?.replace("/code", ""); // Correctly remove '/code'

  if (!actualFilePath) {
    throw Error("RepoItemPath param came out as undefined or invalid");
  }

  // Pass the actual file path to GetRepoFileCode
  const fileContent = GetRepoFileContent(actualFilePath); 


  return (
    <div>
      <h1>Viewing File: {actualFilePath}</h1>
      <pre>{JSON.stringify(fileContent, null, 2)}</pre> {/* Display the code */}
    </div>
  );
};

export default RepositoryFile;
