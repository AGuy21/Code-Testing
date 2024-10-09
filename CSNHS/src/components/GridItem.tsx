
type ProgrammingLanguageItemProps = {
    logo: string;
    name: string;
}
const ProgrammingLanguageItem = ({logo, name}: ProgrammingLanguageItemProps ) => {
  return (
    <div className="flex justify-evenly items-center w-full h-[10vh]">
      <div className="flex fkex-col items-center gap-[5%]">
        <img src={logo} className="lg:w-[15%] w-[12%]"/>
        <div className="font-sans text-textfordark xl:text-5xl lg:text-2xl text-lg font-bold">
            {name}
        </div>
      </div>
    </div>
  )
}

export default ProgrammingLanguageItem
