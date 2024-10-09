import Header from "../components/Header";
import Pic2 from "../assets/Pic2.jpeg";
const About = () => {
  return (
    <>
      <Header SelectedPage="About Me" />
      <div className="flex flex-col w-full h-[100vh] bg-darkbg pt-[10%] px-[5%] items-center gap-y-[5vh]">
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
          </div>
        </div>

        <div className="flex w-full">
          <div className="font-sans w-full text-textfordark xl:text-6xl md:text-5xl text-4xl font-bold text-left border-b-2 pb-[2vh] border-darkoutline">
            My Languages:
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
