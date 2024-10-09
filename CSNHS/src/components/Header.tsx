import { useState } from "react";
import { headerItems } from "../data/header";

interface HomeProps {
  SelectedPage: string;
}

const Header = ({ SelectedPage }: HomeProps) => {
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
          {/*If the item is hovered (hovered index === item index the item will enlarge and change to yellow color,
           if it isnt hovered AND no other item is hovered they will all be default size and color (white),
            if it isn't hovered BUT an item is hovered that isnt the current item's style it will shrink and change to a light gray*/}
          <div
            className={`transition-all duration-300 ease-in-out transform 
              
              ${
                hoveredIndex != null
                  ? hoveredIndex === index
                    ? "translate-y-[-5px] text-csgold font-bold border-b-4 border-csgold"
                    : "scale-90 text-gray-400"
                  : SelectedPage === item.title
                  ? "text-csgold border-csgold font-bold"
                  : "text-white border-white"
              } ${
              SelectedPage === item.title
                ? "text-csgold border-csgold font-bold"
                : ""
            }content-center text-center font-serif text-sm md:text-lg lg:text-2xl xl:text-3xl header-text border-b-2 self-center`}
          >
            {item.title}
          </div>
        </a>
      ))}
    </div>
  );
};



export default Header;
