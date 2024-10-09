import AttributionItem from "./AttributionItem"; // Importing the AttributionItem component for displaying individual attribution links/items

/**
 * - This component renders an area dedicated to displaying attributions for various icons that are used throughout the application. Each attribution is provided as a link to the respective icon source.
 *
 * @returns {JSX.Element} - A JSX element containing the attribution items.
 */
const AttributionArea = (): JSX.Element => {
  return (
    <div className="flex justify-evenly items-center bg-darkbg border-t-2 xl:text-xl lg:text-lg md:text-md text-sm border-darkoutline w-full h-[10vh] overflow-hidden">
      {/* Each AttributionItem component receives a link and a title for the icons being attributed */}
      <AttributionItem
        link="https://www.flaticon.com/free-icons/typescript"
        title="TypeScript icons"
      />
      <AttributionItem
        link="https://www.flaticon.com/free-icons/javascript"
        title="JavaScript icons"
      />
      <AttributionItem
        link="https://www.flaticon.com/free-icons/python"
        title="Python icons"
      />
      <AttributionItem
        link="https://www.flaticon.com/free-icons/react"
        title="React icons"
      />
      <AttributionItem
        link="https://github.com/gilbarbara/logos?ref=svgrepo.com"
        title="React logos"
      />
    </div>
  );
};

export default AttributionArea; // Exported to be used as a footer on the About Me Page.
