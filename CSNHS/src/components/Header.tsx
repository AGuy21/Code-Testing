import { useState } from "react"; // Importing useState for managing component state
import { headerItems } from "../data/header"; // Importing header items data

// Defining the props for the Header component
interface HomeProps {
  SelectedPage: string; // The currently selected page, used for styling.
}

/**
 * - This component renders a navigation header with links to various sections of the website.
 * - It highlights the currently selected page and provides hover effects for the links.
 *
 * @param {HomeProps} props - The properties passed to the component.
 * @returns {JSX.Element} - A JSX element representing the header navigation.
 */
const Header = ({ SelectedPage }: HomeProps): JSX.Element => {
  // State to track the index of the currently hovered header item
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-evenly bg-csblue w-full h-[8vh] border-b-4 p-[2%]">
      {/* Mapping through headerItems to create navigation links */}
      {headerItems.map((item, index) => (
        <a
          key={item.title} //*Unique key for each item based on title (asince there should never be 2 of the same page in the header)
          href={item.route} // Route for navigation
          className={`w-[15%] h-[8vh] content-center`} // Basic styling for the anchor tag
          onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
          onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
        >
          {/* Conditional styling for the header item based on hover and selection state */}
          <div
            className={`transition-all duration-300 ease-in-out transform 
              ${
                hoveredIndex != null
                  ? hoveredIndex === index // If the item is currently hovered
                    ? "translate-y-[-5px] text-csgold font-bold border-b-4 border-csgold" // Highlighted style
                    : "scale-90 text-gray-400" // Shrunk style for non-hovered items
                  : SelectedPage === item.title // If the item is the selected page
                  ? "text-csgold border-csgold font-bold" // Highlighted style for selected page
                  : "text-white border-white" // Default style for non-selected items
              } 
              ${
                SelectedPage === item.title
                  ? "text-csgold border-csgold font-bold"
                  : ""
              }
              content-center text-center font-serif text-sm md:text-lg lg:text-2xl xl:text-3xl header-text border-b-2 self-center`}
          >
            {item.title} {/* Displaying the title of the header item */}
          </div>
        </a>
      ))}
    </div>
  );
};

export default Header; // Exported component for use in other parts of the application.
