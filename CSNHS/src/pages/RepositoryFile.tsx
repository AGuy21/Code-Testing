import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import { GetRepoFileContent } from "../backend/GetRepoFileContent"; // Function to fetch the content of the repository file
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Import syntax highlighter component used to show code
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism"; // Import the syntax highlighting style used to style code that is shown
import { ChevronLeft } from "lucide-react"; // Import back button icon from lucide

const RepositoryFile = () => {
  // Get the repositories path from the URL parameters
  const { "*": repoPath } = useParams();
  
  if (!repoPath) { // Makes sure repository path exists
    throw Error
  }

  // Fetch the file content based item path
  const fileContent = GetRepoFileContent(repoPath)

  // Function to handle the back navigation, uses window history to do this
  const handleBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="flex flex-col w-full h-[100vh] bg-codeThemeBg"> {/* Main container for the file view */}
      <div className="w-full h-[3vh] items-center justify-between border-b-2 flex gap-x-[30%]"> {/* Header section of file content*/}
        <button onClick={() => handleBack()}> {/* Back button */}
          <ChevronLeft color="#fff" /> {/* Icon for back navigation */}
        </button>
        
        <h1 className="font-sans text-textfordark text-xl"> {/* Display the file name */}
          {fileContent.name}
        </h1>
        <h1 className="font-sans text-textfordark text-xl"> {/* Display the file size */}
          {fileContent.size} kb
        </h1>
      </div>

      {/* Syntax highlighter for displaying the file's code */}
      <SyntaxHighlighter language="javascript" style={solarizedDarkAtom}>
        {atob(fileContent.content)} {/* Decode and render the file content since API returns content in base64 encode */} 
      </SyntaxHighlighter>
    </div>
  );
};

export default RepositoryFile; 
