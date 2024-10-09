import React from 'react'

type ProgrammingLanguageItemProps = {
    logo: string;
    name: string;
}
const ProgrammingLanguageItem = ({logo, name}: ProgrammingLanguageItemProps ) => {
  return (
    <div>
      <div>
        <img src={logo} />
        <div>
            {name}
        </div>
      </div>
    </div>
  )
}

export default ProgrammingLanguageItem
