import { GetRepoFileContent } from "../backend/GetRepoFileContent";

interface AboutProjectFileProps {
  projectPath: string;
}
const AboutProjectFile = ({ projectPath }: AboutProjectFileProps) => {
  const fileContent = GetRepoFileContent(projectPath + "/About.md"); // Take project path and add the About.md file so we can read the About.md for the file in particular
  return (
    <div className="flex w-full h-fit justify-start bg-darkbg flex-col p-[2%] gap-y-[1vh]">
        <div className="font-sans  text-darkemphasizedtext xl:text-4xl md:text-5xl text-3xl font-bold text-left mb-[1%] pb-[1%] border-b-2 border-darkoutline">
              About {projectPath} from {projectPath}/About.md
            </div>
      <div className="font-sans text-textfordark xl:text-2xl md:text-xl text-lg font-bold text-left">
        {atob(fileContent.content)}{" "}
        {/* Decode and render the file content since API returns content in base64 encode */}
      </div>
    </div>
  );
};

export default AboutProjectFile;
