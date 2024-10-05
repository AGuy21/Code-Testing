import { useParams, useNavigate } from "react-router-dom";
import { GetRepoFolderContents } from "../backend/GetRepoFolderContents";
import { RepoItem } from "../types/RepoItem";
import { FileCode2, FolderClosedIcon, Link } from "lucide-react";
import { useState, useEffect } from "react";
import RepositoryFile from "./RepositoryFile";

const RepositoryFolder = () => {
  //!IF IT IS A FILE IT WILL CAUSE AN INITAL 404 FETCHING ERROR THIS IS OK!! IT WILL BE FIXED BY RETURNING THE REPOSITORY FILE COMPONENT IT NEEDS TO BE THIS WAY OR ELSE APP BREAKS
  const navigate = useNavigate();
  const { "*": repoPath } = useParams();

  if (!repoPath) {
    throw Error("Repository Path came back as undefined")
  }
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFileView, setIsFileView] = useState<boolean>(false); // State to toggle between folder and file view

  // Fetch the folder contents
  const repoFolderContent = GetRepoFolderContents(repoPath) as RepoItem[];

  // Effect to detect if we're in file view
  useEffect(() => {
    if (repoPath?.includes('/code')) {
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
    console.log('Clicked item with type: ' + item.type);
    if (item.type === "file") {
      // Navigate to code view for file
      navigate(`/projects/${item.path}/code`);
    } else {
      // Navigate to folder
      navigate(`/projects/${item.path}`);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-start items-center bg-darkbg border border-darkoutline rounded-b-xl">
        {repoFolderContent?.map((item, index) => (
          <div
            onClick={() => handleFileClick(item)} // Handle file/folder click
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={index}
            className="flex duration-300 font-sans text-xl px-[1%] py-[1%] text-textfordark border-t-2 border-darkoutline hover:text-indigo-400 hover:bg-darkemphasized hover:font-bold w-full p-[.5%] cursor-pointer"
          >
            <div className="flex w-full justify-start gap-[3%] items-center">
              {item.type === "dir" ? (
                <FolderClosedIcon
                  color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"}
                />
              ) : (
                <FileCode2
                  color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"}
                />
              )}
              <h4 className="xl:text-2xl text-lg">{item.name}</h4>
            </div>

            <div className="flex w-full justify-end">
              <a href={item._links.html}>
                <Link color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryFolder;
