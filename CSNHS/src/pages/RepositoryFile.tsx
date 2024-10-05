import { useParams } from "react-router-dom";
import { GetRepoFileContent } from "../backend/GetRepoFileContent";
import { RepoFile } from "../types/RepoFile";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom  } from "react-syntax-highlighter/dist/esm/styles/prism"; // Change the style here

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

  return (
    <div>
      <SyntaxHighlighter language="javascript" style={solarizedDarkAtom  }>
        {atob(fileContent.content)}
      </SyntaxHighlighter>
    </div>
  );
};
/**
 * 

const CodeBlock = ({ codeString }) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
 */
export default RepositoryFile;
