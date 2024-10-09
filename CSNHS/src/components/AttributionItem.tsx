import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter"; // Importing a utility function to capitalize the first letter of a string

// Defining the props for the AttributionItem component
interface AttributionItemProps {
  link: string; // The URL to the attribution item's website.
  title: string; // The title of the attribution, typically the name of the icon.
}

/**
 * - This component renders a single attribution link for an icon or asset used in the application.
 * - It formats the title using the `capitalizeFirstLetter` utility function and displays a standardized attribution message.
 *
 * @param {AttributionItemProps} props - The properties passed to the component.
 * @returns {JSX.Element} - A JSX element representing the attribution link.
 */
const AttributionItem = ({
  link,
  title,
}: AttributionItemProps): JSX.Element => {
  return (
    <a
      className="font-sans text-textfordark p-[2%] h-full" // Styles for the anchor tag
      href={link} // link to the attribution item's website
      title={title} // title of the item use (Ex. javascript icon)
    >
      {/* Displaying the formatted title and attribution text */}
      {capitalizeFirstLetter(title)} created by Freepik - Flaticon
    </a>
  );
};

export default AttributionItem; // Exported the component for use in other parts of the application (Just used in AttributionArea)
