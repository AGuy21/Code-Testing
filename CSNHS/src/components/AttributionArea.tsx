import AttributionItem from "./AttributionItem";

const AttributionArea = () => {
  return (
    <div className="flex justify-evenly items-center bg-darkbg border-t-2 xl:text-xl lg:text-lg md:text-md text-sm border-darkoutline w-full h-[10vh]  overflow-hidden">
      <AttributionItem link="https://www.flaticon.com/free-icons/typescript"  title="typescript icons"/>
      <AttributionItem link="https://www.flaticon.com/free-icons/javascript"  title="javascript icons"/>
      <AttributionItem link="https://www.flaticon.com/free-icons/python"  title="python icons"/>
      <AttributionItem link="https://www.flaticon.com/free-icons/react"  title="react icons"/>
      <AttributionItem link="https://github.com/gilbarbara/logos?ref=svgrepo.com"  title="react icons"/>
      <AttributionItem link="https://www.flaticon.com/free-icons/database" title="database icons"/>
    </div>
  );
};

export default AttributionArea;
