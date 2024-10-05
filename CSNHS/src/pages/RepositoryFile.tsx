import { useParams } from "react-router-dom";
import { GetRepoFileCode } from "../backend/GetRepoFileCode";


const RepositoryFile = () => {
  
  const { "*": repoItemPath } = useParams();
  const actualFilePath = repoItemPath?.replace("/code", ""); // Correctly remove '/code'

  if (!actualFilePath) {
    throw Error("RepoItemPath param came out as undefined or invalid");
  }

  // Pass the actual file path to GetRepoFileCode
  const code = GetRepoFileCode(actualFilePath); 


  return (
    <div>
      <h1>Viewing File: {actualFilePath}</h1>
      <pre>{JSON.stringify(code, null, 2)}</pre> {/* Display the code */}
    </div>
  );
};

export default RepositoryFile;
