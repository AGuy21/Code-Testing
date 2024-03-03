
import { useState } from "react";
import colorLib from "./colorLib";

const useGetColors = () => {
  const [Colors, setColors] = useState(colorLib.basic);

  function changeColors(newTheme: string) {
    if (newTheme === 'light') {
      console.log('light mode clicked');
      setColors(colorLib.light);
    } else if (newTheme === 'dark') {
      console.log('dark mode clicked');
      setColors(colorLib.dark);
    } else {
      console.log('basic mode clicked');
      setColors(colorLib.basic);
    }
  }

  return { Colors, changeColors };
}

export default useGetColors;
