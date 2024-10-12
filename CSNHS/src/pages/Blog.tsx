import Header from "../components/Header";
import { BlogText } from "../data/blog";

const Blog = () => {
  return (
    <>
      <Header SelectedPage="Blog" />
      {/*Page Content */}
      <div className="flex w-full h-fit justify-start bg-darkbg flex-col p-[5%] gap-y-[5vh]">
        {BlogText.map((item) => (
          <div>
            <div className="font-sans  text-darkemphasizedtext xl:text-6xl md:text-5xl text-4xl font-bold text-left mb-[2%]  pb-[1%] border-b-2 border-darkoutline">
              {item.title}
            </div>

            <div className="font-sans text-textfordark xl:text-3xl md:text-2xl text-xl font-bold text-left">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
