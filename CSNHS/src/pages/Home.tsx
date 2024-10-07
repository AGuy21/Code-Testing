import Header from "../components/Header";

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
                CSNHS is a prestigious organization dedicated to fostering a
                love for computer science and promoting academic prowess in
                computer science among high school student. They strive to
                inspire the next generation of programmers by recognizing those
                who demonstrate exceptional aptitude in computer science &
                leadership and helping them with the field of computer science.
              </div>
              <div className="font-sans text-textfordark xl:text-xl lg:text-lg text-md">
                The misson of CSHS is to empower students to develop their
                skills in coding, problem-solving, and technology. They do this
                while encouraging collaboration, good behavior, and the pursuit
                of higher education in the computer science field. As a member,
                you'll join a network of peers with similar interests and have
                the opportunity to engage in exciting projects and activities,
                all designed to make a positive impact on both your school, your
                education, and the computer science field.
              </div>
            </div>
            <div className="flex flex-col w-[100%] lg:h-[60vh] h-[70vh]  overflow-y-auto border-2 border-darkoutline p-[2%] gap-y-[2vh] my-8">
              <h2 className="font-sans text-textfordark   xl:text-3xl lg:text-2xl text-xl font-bold mb-[2%]">
                Why You Should Join the Computer Science National Honor Society
                (CSNHS)
              </h2>
              <ul className="list-disc list-inside text-left space-y-4 font-sans text-textfordark xl:text-xl lg:text-lg text-md">
                <li>
                  <strong>Recognition of Academic Excellence:</strong> As a
                  CSNHS member, your dedication to computer science and your
                  academic achievements are formally recognized. This
                  prestigious honor sets you apart and enhances your college
                  applications and resumes.
                </li>
                <li>
                  <strong>Networking & Mentorship:</strong> CSNHS connects you
                  with a network of like-minded students, teachers, and
                  professionals who share your passion for computer science.
                  You'll have access to mentorship opportunities, guidance, and
                  peer collaboration to help you grow both personally and
                  academically.
                </li>
                <li>
                  <strong>Access to Resources & Events:</strong>{" "}
                  Participate in workshops, coding challenges, hackathons, and
                  guest speaker events that offer hands-on experience with
                  industry trends and real-world applications.
                </li>
                <li>
                  <strong>Scholarship & Internship Opportunities:</strong>{" "}
                  CSNHS members can gain access to exclusive scholarships and
                  internships, giving you a competitive edge in securing
                  internships with leading tech companies or scholarships for
                  higher education.
                </li>
                <li>
                  <strong>Leadership & Community Engagement:</strong> Build
                  leadership skills through outreach programs, tutoring, and
                  volunteering, all while inspiring others to pursue computer
                  science and STEM-related fields.
                </li>
                <li>
                  <strong>Career Advancement:</strong> Membership in CSNHS
                  prepares you for in-demand tech careers such as software
                  development, data science, cybersecurity, artificial
                  intelligence, and more, ensuring you're equipped for the
                  future job market.
                </li>
                <li>
                  <strong>Ethical & Responsible Innovation:</strong> Learn to
                  use your coding skills ethically and responsibly, contributing
                  to technologies that positively impact society.
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
