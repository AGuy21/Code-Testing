import Header from "../components/Header";
import { homeText } from "../data/home";

const Home = () => {
  return (
    <>
      <Header SelectedPage="Home" />
      <div className="flex flex-col w-full h-full bg-darkbg p-[5%]">
        <div className="flex flex-col  gap-[2%] w-full">
          <div className="flex flex-col lg:flex-row gap-2 mb-[2%] justify-start items-center">
            <div className="font-serif text-csblue xl:text-5xl md:text-4xl text-3xl font-bold text-left">
              Computer Science
            </div>
            <div className="font-serif text-darkemphasizedtext xl:text-5xl md:text-4xl text-3xl font-bold text-left">
              National
            </div>
            <div className="font-serif text-csgold  xl:text-5xl md:text-4xl text-3xl font-bold text-left">
              Honor Society
            </div>
          </div>
          <div className="flex flex-col gap-y-[4vh]">
            <div className="flex flex-col w-[100%] h-[40vh]  border-2  border-darkoutline p-[2%] gap-y-[2vh]">
              <h1 className="font-sans text-textfordark   xl:text-3xl lg:text-2xl text-xl font-bold mb-[2%]">
                General Description of the Computer Science National Honor
                Society (CSNHS)
              </h1>
              <div className="font-sans text-textfordark xl:text-xl lg:text-lg text-md">
                {homeText.CSNHSDescriptionP1}
              </div>
              <div className="font-sans text-textfordark xl:text-xl lg:text-lg text-md">
                {homeText.CSNHSDescriptionP2}
              </div>
            </div>

            <div className="flex flex-col w-[100%] lg:h-[60vh] h-[70vh]  overflow-y-auto border-2 border-darkoutline p-[2%] gap-y-[2vh] my-8">
              <h2 className="font-sans text-textfordark   xl:text-3xl lg:text-2xl text-xl font-bold mb-[2%]">
                Why You Should Join the Computer Science National Honor Society
                (CSNHS)
              </h2>
              <ul className="list-disc list-inside text-left space-y-4 font-sans text-textfordark xl:text-xl lg:text-lg text-md">
                <li>
                  <strong>Recognition of Academic Excellence:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.Recognition}
                </li>
                <li>
                  <strong>Networking & Mentorship:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.Networking}
                </li>
                <li>
                  <strong>Access to Resources & Events:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.Resources}
                </li>
                <li>
                  <strong>Scholarship & Internship Opportunities:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.ScholarshipOpportunities}
                </li>
                <li>
                  <strong>Leadership & Community Engagement:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.Community}
                </li>
                <li>
                  <strong>Career Advancement:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.CareerAdvancement}
                </li>
                <li>
                  <strong>Ethical & Responsible Innovation:</strong>{" "}
                  {homeText.WhyJoinCSNHSList.EthicalInnovation}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
