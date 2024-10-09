// Defining the props for the GridItemProps component
type GridItemProps = {
  logo: string; // file dir of the logo image for the item.
  name: string; // Name of the item.
};

/**
 * - This component displays an item representing a grid item, including its logo and name. It is styled to be centered and responsive.
 *
 * @param {GridItemProps} props - The properties passed to the component.
 * @returns {JSX.Element} - A JSX element representing the item.
 */
const GridItem = ({ logo, name }: GridItemProps): JSX.Element => {
  return (
    <div className="flex justify-evenly items-center w-full">
      <div className="flex flex-col items-center gap-[5%]">
        {/* Image displaying the logo of the item */}
        <img src={logo} alt={`${name} logo`} className="w-[5vh] h-fit" />
        {/* Text displaying the name of the item */}
        <div className="font-sans text-textfordark xl:text-5xl lg:text-2xl text-lg font-bold">
          {name}
        </div>
      </div>
    </div>
  );
};

export default GridItem; // Exported the component for use in other parts of the application.
