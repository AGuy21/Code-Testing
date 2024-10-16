import Header from "../components/Header";
import Pic2 from "../assets/Pic2.jpeg";
import { AboutMeData } from "../data/about";
import GridItem from "../components/GridItem";
import AttributionArea from "../components/AttributionArea";
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
const About = () => {
  return (
    <>
      <Header SelectedPage="About Me" />
      {/*Page Content */}
      <div className="flex flex-col w-full h-fit pb-[5%] bg-darkbg pt-[10%] px-[5%] items-center gap-y-[5vh] ">
        {/*Title of content page containing my name & image */}
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[40vh] justify-evenly items-center">
          <img
            src={Pic2}
            className="w-[40%] md:w-[30%] size-fit rounded-full mb-5 md:mb-0 md:mr-[5%]"
          />
          <div className="flex flex-col gap-y-[1vh] justify-center items-start w-full h-full border-l-2 border-darkoutline p-[2%]">
            <div className="font-sans text-textfordark xl:text-6xl md:text-5xl text-4xl font-bold text-left">
              Hello,
            </div>
            <div className="flex gap-2 justify-start items-center">
              <div className="font-sans text-textfordark xl:text-4xl md:text-3xl text-2xl font-semibold text-left">
                I am
              </div>
              <div className="font-sans text-darkemphasizedtext xl:text-4xl md:text-3xl text-2xl font-extrabold text-left">
                Jaxon Perez
              </div>
            </div>
            <div className="font-sans text-textfordark xl:text-3xl md:text-2xl text-xl font-semibold text-left">
              I'm a mobile application developer
            </div>
            <Link
              to="/blog"
              className="flex  w-full gap-[1%] items-center mt-[5%]"
            >
              <div className="font-sans text-secondarydarktext xl:text-3xl md:text-2xl text-xl font-semibold text-left">
                See my blog?
              </div>
              <Link2 color="#FFF" />
            </Link>
          </div>
        </div>
        {/*Languages */}
        <div className="flex flex-col w-full mt-[5%]">
          <div className="font-sans w-full text-textfordark xl:text-6xl md:text-5xl text-4xl font-bold text-left border-b-2 pb-[2vh] border-darkoutline">
            My Languages:
          </div>
          <div className="flex items-center w-full h-[10vh] pt-[2%] ">
            {AboutMeData.ProgrammingLanguages.map((lang) => (
              <GridItem logo={lang.iconUrl} name={lang.name} />
            ))}
          </div>
        </div>
        {/*Frameworks */}
        <div className="flex flex-col w-full mt-[5%]">
          <div className="font-sans w-full text-textfordark xl:text-6xl md:text-5xl text-4xl font-bold text-left border-b-2 pb-[2vh] border-darkoutline">
            My Frameworks:
          </div>
          <div className="flex items-center w-full h-[10vh] pt-[2%] ">
            {AboutMeData.Frameworks.map((frameowrk) => (
              <GridItem logo={frameowrk.iconUrl} name={frameowrk.name} />
            ))}
          </div>
        </div>

        {/*Tech Stacks */}
        <div className="flex  items-start mt-[5%]">
          <div className="flex flex-col ">
            <div className="font-sans w-full text-textfordark xl:text-6xl md:text-5xl text-4xl font-bold text-left border-b-2 pb-[2vh] border-darkoutline ">
              My Mobile App Tech-Stack:
            </div>
            <div className="grid grid-cols-3 grid-rows-2 h-[35vh] w-full pt-[2%] ">
              {AboutMeData.TechStack.map((item) => (
                <GridItem logo={item.iconUrl} name={item.name} />
              ))}
            </div>
          </div>
        </div>
        <div>
          {AboutMeData.AboutMe.map((item) => (
            <div className="mt-[5%]">
              <div className="font-sans  text-darkemphasizedtext xl:text-6xl md:text-5xl text-4xl font-bold text-left mb-[2%]  pb-[1%] border-b-2 border-darkoutline">
                {item.title}
              </div>

              <div className="font-sans text-textfordark xl:text-3xl md:text-2xl text-xl font-bold text-left">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <AttributionArea />
      </footer>
    </>
  );
};

export default About;
