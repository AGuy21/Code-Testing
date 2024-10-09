import { useParams, useNavigate } from "react-router-dom";
import { GetRepoFolderContents } from "../backend/GetRepoFolderContents";
import { RepoItem } from "../types/RepoItem";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import RepositoryFile from "./RepositoryFile";
import RepoFolderContentItem from "../components/RepoFolderContentItem";

const RepositoryFolder = () => {
  //!IF IT IS A FILE IT WILL CAUSE AN INITAL 404 FETCHING ERROR THIS IS OK!! IT WILL BE FIXED BY RETURNING THE REPOSITORY FILE COMPONENT IT NEEDS TO BE THIS WAY OR ELSE APP BREAKS
  const navigate = useNavigate();
  const { "*": repoPath } = useParams();

  if (!repoPath) {
    throw Error("Repository Path came back as undefined");
  }
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFileView, setIsFileView] = useState<boolean>(false); // State to toggle between folder and file view

  // Fetch the folder contents
  const repoFolderContent = GetRepoFolderContents(repoPath);

  // Effect to detect if we're in file view
  useEffect(() => {
    if (repoPath?.includes("/code")) {
      setIsFileView(true);
    } else {
      setIsFileView(false);
    }
  }, [repoPath]); // Re-run this effect whenever repoPath changes

  // If in file view, render RepositoryFile
  if (isFileView) {
    return <RepositoryFile />;
  }

  // Handle click on a file or folder
  const handleFileClick = (item: RepoItem) => {
    console.log("Clicked item with type: " + item.type);
    if (item.type === "file") {
      // Navigate to code view for file
      if (item.name.endsWith('.gif') || item.name.endsWith('.jpg') || item.name.endsWith('.json') || item.name.endsWith('.jpeg')) {
        alert('Sorry this file is not compatible for window-view. If you would like to open it up use the link button.');
      } else {
        navigate(`/projects/${item.path}/code`);
      }
    } else {
      // Navigate to folder
      navigate(`/projects/${item.path}`);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center bg-darkbg">
      <div className="w-full h-[3vh] justify-start items-center border-b-2 flex">
        <button
          onClick={() => handleBack()}
          className="flex gap-[1%] items-center"
        >
          <ChevronLeft color="#fff" />

          <h1 className="font-sans text-secondarydarktext text-lg">Back</h1>
        </button>

        <h1 className="font-sans text-textfordark text-xl ml-[5%]">
          {repoPath}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-darkbg border border-darkoutline rounded-b-xl">
        {repoFolderContent?.map((item, index) => (
          <RepoFolderContentItem item={item} index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} handleFileClick={handleFileClick}/>
        ))}
      </div>
    </div>
  );
};

export default RepositoryFolder;
