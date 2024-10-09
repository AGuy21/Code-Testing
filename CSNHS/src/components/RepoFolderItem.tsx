import React from "react";
import { RepoFolder } from "../types/RepoFolder";
import { FolderClosedIcon, Link } from "lucide-react";

type RepoFolderItemProps = {
  folder: RepoFolder;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
};
const RepoFolderItem = ({
  folder,
  index,
  hoveredIndex,
  setHoveredIndex,
}: RepoFolderItemProps) => {
  return (
    <a
      href={"/projects/" + folder.name}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      key={index}
      className="flex  duration-300 font-sans text-xl   px-[1%] py-[1%] text-textfordark border-t-2 border-darkoutline hover:text-indigo-400 hover:bg-darkemphasized hover:font-bold w-full p-[.5%]"
    >
      <div className="flex w-full justify-start gap-[3%] items-center">
        <FolderClosedIcon
          color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"}
        />
        <h4 className="xl:text-2xl  text-lg">{folder.name}</h4>
      </div>

      <div className="flex w-full justify-end">
        <a href={folder._links.html}>
          <Link color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"} />
        </a>
      </div>
    </a>
  );
};

export default RepoFolderItem;
