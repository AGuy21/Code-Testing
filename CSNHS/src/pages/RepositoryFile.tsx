import { useParams } from "react-router-dom";
import { GetRepoFileContent } from "../backend/GetRepoFileContent";
import { RepoFile } from "../types/RepoFile";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom  } from "react-syntax-highlighter/dist/esm/styles/prism"; // Change the style here
import { ChevronLeft } from "lucide-react";

const ErrorContent: RepoFile = {
  name: "Error",
  path: "",
  sha: "",
  size: 999,
  url: "",
  html_url: "",
  git_url: "",
  download_url: null,
  type: "file",
  content:
    "RXJyb3IgZmluZGluZyB0aGlzIGZpbGUncyBpbmZvcm1hdGlvbi4gUGxlYXNlIHJlbG9hZCBvciByZXBvciBwcm9ibGVtLiBUaGVyZSBtYXkgYWxzbyBiZSBhIGNoYW5jZSB0aGlzIGZpbGUgaGFzIG5vIGNvZGUu",
  encoding: "base64",
  _links: {
    self: "",
    git: "",
    html: "",
  },
};
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
    <div className="flex flex-col w-full  bg-codeThemeBg">
      <div className="w-full h-[3vh] items-center justify-between border-b-2 flex gap-x-[30%]">
        <button onClick={() => handleBack()}>
          <ChevronLeft color="#fff" />
        </button>
        
        <h1 className="font-mono text-textfordark text-xl">
          {fileContent.name}
        </h1>
        <h1 className="font-mono text-textfordark text-xl">
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
