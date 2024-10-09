import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter";

interface AttributionItemProps {
    link: string;
    title: string;
}

const AttributionItem = ({link, title}: AttributionItemProps) => {
  return (
    <a
        className="font-sans text-textfordark p-[2%] h-full"
        href={link}
        title={title}
      >
        {capitalizeFirstLetter(title)} created by Freepik - Flaticon
      </a>
  )
}

export default AttributionItem
