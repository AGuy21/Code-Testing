import FetchRepositoryMainFolders from "../backend/FetchGithubRepoData";
import Header from "../components/Header";
import profile from "../assets/profile.png";
import { Link } from "lucide-react";
import { useState } from "react";
import RepoFolderItem from "../components/RepoFolderItem";

const Projects = () => {
  const repoFolders = FetchRepositoryMainFolders();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <Header SelectedPage="Projects"/>

      <div className="bg-darkbg w-full min-h-screen flex flex-col justify-start align-top p-4 items-center pt-[5%]">
        {/*Github Profile & About the Page*/}
        <div className="flex w-[95%] mb-[5%] gap-[1%] flex-col">
          {/*Github Profile Header */}
          <h1 className="font-sans text-4xl text-textfordark font-bold text-left pb-[1%] mb-[2%] border-b-[.25vh] border-darkoutline">
            My Github Profile
          </h1>
          {/*Github Profile */}
          <div className="flex gap-[2%] mb-[2%] w-full items-center ">
            <img src={profile} className="w-[6%] h-[6%] rounded-full" />
            <div className="flex flex-col">
              <h2 className="font-sans text-3xl text-textfordark font-bold text-left">
                A_Guy
              </h2>
              <div className="font-sans text-xl text-secondarydarktext font-bold text-left">
                AGuy21
              </div>
            </div>
            <a href="https://github.com/AGuy21">
              <Link color="#ced8ee" />
            </a>
            <div className="font-sans xl:text-3xl  lg:text-2xl md:text-lg text-sm text-textfordark font-bold text-left">
              Learing mobile development with react native, web development with
              react, and python for scripting. Also, Typescript &#62; Javascript
              :D
            </div>
          </div>
          {/* About the page */}
          <div className="font-sans xl:text-2xl lg:text-xl md:text-lg text-md  text-textfordark font-bold text-center border-t-2 border-darkoutline pt-[1%]">
            I currently only have one repository that i made on Feb 19th (8
            Months ago)
          </div>
          <div className="font-sans xl:text-xl lg:text-lg md:text-md text-sm text-secondarydarktext font-bold text-center">
            Down below you will find all my repositories and be able to explore
            them right here in the site
          </div>
        </div>
              {/*Shows header for folder elements */}
        <div className="w-[95%] flex flex-col justify-start items-center">
          <div className="w-full flex items-center  bg-darkheader xl:rounded-t-3xl rounded-t-xl border border-darkoutline p-[1%] gap-x-[1%]">
            <div className="font-sans xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-textfordark font-bold text-left pl-[1%]">
              Code-Testing Repository, Currently There Are {repoFolders.length}{" "}
              Projects
            </div>
          </div>
            {/*Showing all folder elements */}
          <div className=" w-full flex flex-col justify-start items-center bg-darkbg border border-darkoutline rounded-b-xl">
            {repoFolders?.map((folder, index) => (
              <RepoFolderItem folder={folder} index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
