import React from 'react'
import { FileCode2, FolderClosedIcon, Link } from 'lucide-react';
import { RepoFolder } from '../types/RepoFolder';

type RepoFolderContentItemProps = {
    item: RepoFolder;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
    handleFileClick: (item: RepoFolder) => void; 
}
const RepoFolderContentItem = ({index, item, hoveredIndex, setHoveredIndex, handleFileClick}: RepoFolderContentItemProps) => {
  return (
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
              <h4 className="font-sans xl:text-2xl text-lg">{item.name}</h4>
            </div>

            <div className="flex w-[40%] overflow-auto h-[100%] justify-end items-end gap-[5%] ">
              {item.type === "file" && (
                <div className="font-sans text-secondarydarktext">
                  <div>{item.size} kb </div>
                </div>
              )}
              <div>
                <a href={item._links.html}>
                  <Link
                    color={hoveredIndex === index ? "#5c6bc0" : "#ced8ee"}
                  />
                </a>
              </div>
            </div>
          </div>
  )
}

export default RepoFolderContentItem
