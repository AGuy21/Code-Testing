import { RepoFolder } from "../types/RepoFolder"; // Importing the RepoFolder type definition
import { FolderClosedIcon, Link } from "lucide-react"; // Importing folder and link icons from lucide-react

// Defining the props for the RepoFolderItem component
type RepoFolderItemProps = {
  folder: RepoFolder; // The folder item to be displayed.
  index: number; // The index of the item in the list.
  hoveredIndex: number | null; // The index of the currently hovered item.
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>; // State setter for hovered index.
};

/**
 * - This component displays an individual folder item within a repository.
 * - It provides hover effects and a link to the corresponding folder page.
 *
 * @param {RepoFolderItemProps} props - The properties passed to the component.
 * @returns {JSX.Element} - A JSX element representing a folder item.
 */
const RepoFolderItem = ({
  folder,
  index,
  hoveredIndex,
  setHoveredIndex,
}: RepoFolderItemProps): JSX.Element => {
  return (
    <a
      href={"/projects/" + folder.name} // Link to the specific folder's page
      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
      onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
      key={index} //*Unique key for the item based on index since this item is to be mapped thus, having a unique key
      className="flex duration-300 font-sans text-xl px-[1%] py-[1%] text-textfordark border-t-2 border-darkoutline hover:text-indigo-400 hover:bg-darkemphasized hover:font-bold w-full p-[.5%]"
    >
      <div className="flex w-full justify-start gap-[3%] items-center">
        <FolderClosedIcon
          color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} // Change icon color based on hover state
        />
        <h4 className="xl:text-2xl text-lg">{folder.name}</h4>{" "}
        {/* Display the folder name */}
      </div>

      <div className="flex w-full justify-end">
        <a href={folder._links.html}>
          {" "}
          {/* Link to the folder on GitHub */}
          <Link color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} />{" "}
          {/* Change link color based on hover state */}
        </a>
      </div>
    </a>
  );
};

export default RepoFolderItem; // Exported the component for use in other parts of the application
