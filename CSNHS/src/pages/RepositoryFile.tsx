import { useParams } from "react-router-dom";
import { GetRepoFileContent } from "../backend/GetRepoFileContent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom  } from "react-syntax-highlighter/dist/esm/styles/prism"; // Change the style here
import { ChevronLeft } from "lucide-react";
import { ErrorContent } from "../data/repository";


const RepositoryFile = () => {
  const { "*": repoItemPath } = useParams();
  const actualFilePath = repoItemPath?.replace("/code", ""); // Correctly remove '/code'

  if (!actualFilePath) {
    throw Error("RepoItemPath param came out as undefined or invalid");
  }

  // Pass the actual file path to GetRepoFileCode
  const fileContent = GetRepoFileContent(actualFilePath) || ErrorContent;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col w-full h-[100vh] bg-codeThemeBg">
      <div className="w-full h-[3vh] items-center justify-between border-b-2 flex gap-x-[30%]">
        <button onClick={() => handleBack()}>
          <ChevronLeft color="#fff" />
        </button>
        
        <h1 className="font-sans text-textfordark text-xl">
          {fileContent.name}
        </h1>
        <h1 className="font-sans text-textfordark text-xl">
          {fileContent.size} kb
        </h1>
      </div>
      <SyntaxHighlighter language="javascript" style={solarizedDarkAtom  }>
        {atob(fileContent.content)}
      </SyntaxHighlighter>
    </div>
  );
};
export default RepositoryFile;
