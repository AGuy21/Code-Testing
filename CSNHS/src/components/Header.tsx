import { useState } from "react";

const Header = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-evenly bg-csblue w-full h-[8vh] border-b-4 p-[2%]">
      {headerItems.map((item, index) => (
        <a
          key={item.title} // Unique key for each item
          href={item.route}
          className={`w-[15%] h-[8vh] content-center`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`transition-all duration-300 ease-in-out transform ${
              hoveredIndex != null
                ? hoveredIndex === index
                  ? "translate-y-[-5px] text-csgold font-bold border-b-4 border-csgold"
                  : "scale-90 text-gray-400"
                : "text-white  border-white"
            } content-center text-center font-serif text-xl border-b-2 self-center `}
          >
            {item.title}
          </div>
        </a>
      ))}
    </div>
  );
};

const headerItems = [
  {
    title: "Home",
    route: "/home",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "My Projects",
    route: "/projects",
  },
  {
    title: "Blog",
    route: "/blog",
  },
];

export default Header;
