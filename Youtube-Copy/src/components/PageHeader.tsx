import { Menu } from "lucide-react";
import logo from "../assets/logo.png";
import { Button } from "./Button";

/**
 * PageHeader is a component that will show the youtube header,
 * This header will have 3 segmants:
 * 1. Left side with menu and logo
 * 2. Middle with search bar and microphone search
 * 3. Account change, notifications, and other icons
 * @returns PageHeader
 */
const PageHeader = () => {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon">
            <Menu /> {/*This is menu icon not component*/}
        </Button>

        <a href="/">
          <img src={logo} className="h-6"></img>
        </a>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default PageHeader;
