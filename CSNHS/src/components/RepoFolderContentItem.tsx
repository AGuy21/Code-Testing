import { FileCode2, FolderClosedIcon, Link } from "lucide-react"; // Importing icons from lucide-react
import { RepoFolder } from "../types/RepoFolder"; // Importing the RepoFolder type definition

// Defining the props for the RepoFolderContentItem component
type RepoFolderContentItemProps = {
  item: RepoFolder; // The folder or file item to be displayed.
  index: number; // The index of the item in the list.
  hoveredIndex: number | null; // The index of the currently hovered item.
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>; // State setter for hovered index.
  handleFileClick: (item: RepoFolder) => void; // Callback function to handle file/folder click.
};

/**
 * - This component displays an individual folder or file item within a repository.
 * - It shows the item's name, type (file or folder), and size (if it's a file).
 * Additionally, it provides hover effects and click handling.
 *
 * @param {RepoFolderContentItemProps} props - The properties passed to the component.
 * @returns {JSX.Element} - A JSX element representing a folder or file item.
 */
const RepoFolderContentItem = ({
  index,
  item,
  hoveredIndex,
  setHoveredIndex,
  handleFileClick,
}: RepoFolderContentItemProps): JSX.Element => {
  return (
    <div
      onClick={() => handleFileClick(item)} // Handle click on file/folder
      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
      onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
      key={index} //*Unique key for the item based on index since this item is to be mapped thus, having a unique key
      className="flex duration-300 font-sans text-xl px-[1%] py-[1%] text-textfordark border-t-2 border-darkoutline hover:text-indigo-400 hover:bg-darkemphasized hover:font-bold w-full p-[.5%] cursor-pointer"
    >
      <div className="flex w-full justify-start gap-[3%] items-center">
        {/* Render icon based on item type */}
        {item.type === "dir" ? (
          <FolderClosedIcon
            color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} // Change icon color based on hover state
          />
        ) : (
          <FileCode2
            color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} // Change icon color based on hover state
          />
        )}
        {/* Display the name of the folder or file */}
        <h4 className="font-sans xl:text-2xl text-lg">{item.name}</h4>
      </div>

      <div className="flex w-[40%] overflow-auto h-[100%] justify-end items-end gap-[5%] ">
        {/* Display file size if the item is a file */}
        {item.type === "file" && (
          <div className="font-sans text-secondarydarktext">
            <div>{item.size} kb </div>{" "}
            {/* File size in kilobytes (base measuring size when fetched from API) */}
          </div>
        )}
        <div>
          <a href={item._links.html}>
            {/* Link to the item in the repository as an icon*/}
            <Link
              color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} // Change link color based on hover state
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoFolderContentItem; // Exported the component for use in other parts of the application
